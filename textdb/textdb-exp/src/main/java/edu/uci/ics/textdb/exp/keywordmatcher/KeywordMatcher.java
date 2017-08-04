package edu.uci.ics.textdb.exp.keywordmatcher;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


import edu.uci.ics.textdb.api.constants.ErrorMessages;
import edu.uci.ics.textdb.api.constants.SchemaConstants;
import edu.uci.ics.textdb.api.exception.DataFlowException;
import edu.uci.ics.textdb.api.exception.TextDBException;
import edu.uci.ics.textdb.api.field.ListField;
import edu.uci.ics.textdb.api.schema.Attribute;
import edu.uci.ics.textdb.api.schema.AttributeType;
import edu.uci.ics.textdb.api.schema.Schema;
import edu.uci.ics.textdb.api.span.Span;
import edu.uci.ics.textdb.api.tuple.Tuple;
import edu.uci.ics.textdb.api.utils.Utils;
import edu.uci.ics.textdb.exp.common.AbstractSingleInputOperator;
import edu.uci.ics.textdb.exp.utils.DataflowUtils;

public class KeywordMatcher extends AbstractSingleInputOperator {

    private final KeywordPredicate predicate;

    private Schema inputSchema;
    private ArrayList<Set<String>> queryTokenSetList;
    private ArrayList<List<String>> queryTokenList;
    private ArrayList<List<String>> queryTokenWithStopwordsList;

    public KeywordMatcher(KeywordPredicate predicate) {
        this.predicate = predicate;
        this.limit = predicate.getLimit();
        this.offset = predicate.getOffset();

    }

    @Override
    protected void setUp() throws TextDBException {
        inputSchema = inputOperator.getOutputSchema();
        outputSchema = inputSchema;
        if (!inputSchema.containsField(SchemaConstants.PAYLOAD)) {
            outputSchema = Utils.addAttributeToSchema(outputSchema, SchemaConstants.PAYLOAD_ATTRIBUTE);
        }
        if (inputSchema.containsField(predicate.getSpanListName())) {
            throw new DataFlowException(ErrorMessages.DUPLICATE_ATTRIBUTE(predicate.getSpanListName(), inputSchema));
        } else {
            outputSchema = Utils.addAttributeToSchema(outputSchema,
                    new Attribute(predicate.getSpanListName(), AttributeType.LIST));
        }
        if (this.predicate.getMatchingType() == KeywordMatchingType.CONJUNCTION_INDEXBASED) {
            preProcessKeywordTokens();
        } else if (this.predicate.getMatchingType() == KeywordMatchingType.PHRASE_INDEXBASED) {
            preProcessKeywordTokensWithStopwords();

        }

    }

    private void preProcessKeywordTokens() {
        queryTokenSetList = new ArrayList<>();
        queryTokenSetList.add(new HashSet<>(DataflowUtils.tokenizeQuery(predicate.getLuceneAnalyzerString(), predicate.getQuery())));
    }

    private void preProcessKeywordTokensWithStopwords() {
        queryTokenList = new ArrayList<>();
        queryTokenWithStopwordsList = new ArrayList<>();
        queryTokenList.add(DataflowUtils.tokenizeQuery(predicate.getLuceneAnalyzerString(), predicate.getQuery()));
        queryTokenWithStopwordsList.add(DataflowUtils.tokenizeQueryWithStopwords(predicate.getQuery()));
    }

    @Override
    protected Tuple computeNextMatchingTuple() throws TextDBException {
        Tuple inputTuple = null;
        Tuple resultTuple = null;

        while ((inputTuple = inputOperator.getNextTuple()) != null) {
            resultTuple = processOneInputTuple(inputTuple);

            if (resultTuple != null) {
                break;
            }
        }
        return resultTuple;
    }

    @Override
    public Tuple processOneInputTuple(Tuple inputTuple) throws TextDBException {
        // There's an implicit assumption that, in open() method, PAYLOAD is
        // checked before SPAN_LIST.
        // Therefore, PAYLOAD needs to be checked and added first
        if (!inputSchema.containsField(SchemaConstants.PAYLOAD)) {
            inputTuple = DataflowUtils.getSpanTuple(inputTuple.getFields(),
                    DataflowUtils.generatePayloadFromTuple(inputTuple, predicate.getLuceneAnalyzerString()), outputSchema);
        }
        if (predicate.getSpanListName() != null) {
            inputTuple = DataflowUtils.getSpanTuple(inputTuple.getFields(), new ArrayList<Span>(), outputSchema);
        }

        List<Span> matchingResults = new ArrayList<>();
        if (this.predicate.getMatchingType() == KeywordMatchingType.CONJUNCTION_INDEXBASED) {
            List<String> keywordList = new ArrayList<>();
            keywordList.add(predicate.getQuery());
            DataflowUtils.appendConjunctionMatchingSpans(inputTuple, predicate.getAttributeNames(), queryTokenSetList, keywordList, matchingResults);
        }
        if (this.predicate.getMatchingType() == KeywordMatchingType.PHRASE_INDEXBASED) {
            List<String> keywordList = new ArrayList<>();
            keywordList.add(predicate.getQuery());
            DataflowUtils.appendPhraseMatchingSpans(inputTuple, predicate.getAttributeNames(), queryTokenList, queryTokenWithStopwordsList, keywordList, matchingResults);
        }
        if (this.predicate.getMatchingType() == KeywordMatchingType.SUBSTRING_SCANBASED) {
            DataflowUtils.appendSubstringMatchingSpans(inputTuple, predicate.getAttributeNames(), predicate.getQuery(), matchingResults);
        }
        if (matchingResults == null) {
            throw new DataFlowException("no matching result is provided");
        }
        if (matchingResults.isEmpty()) {
            return null;
        }

        ListField<Span> spanListField = inputTuple.getField(predicate.getSpanListName());
        List<Span> spanList = spanListField.getValue();
        spanList.addAll(matchingResults);

        return inputTuple;
    }

    @Override
    protected void cleanUp() {
    }


    public KeywordPredicate getPredicate() {
        return this.predicate;
    }

}
