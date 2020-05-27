/*
 * This file is generated by jOOQ.
 */
package edu.uci.ics.texera.dataflow.jooq.generated;


import edu.uci.ics.texera.dataflow.jooq.generated.tables.Useraccount;
import edu.uci.ics.texera.dataflow.jooq.generated.tables.Userfile;

import org.jooq.Index;
import org.jooq.OrderField;
import org.jooq.impl.Internal;


/**
 * A class modelling indexes of tables of the <code>texera</code> schema.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Indexes {

    // -------------------------------------------------------------------------
    // INDEX definitions
    // -------------------------------------------------------------------------

    public static final Index USERACCOUNT_PRIMARY = Indexes0.USERACCOUNT_PRIMARY;
    public static final Index USERACCOUNT_USERNAME = Indexes0.USERACCOUNT_USERNAME;
    public static final Index USERFILE_PRIMARY = Indexes0.USERFILE_PRIMARY;
    public static final Index USERFILE_USERID = Indexes0.USERFILE_USERID;

    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class Indexes0 {
        public static Index USERACCOUNT_PRIMARY = Internal.createIndex("PRIMARY", Useraccount.USERACCOUNT, new OrderField[] { Useraccount.USERACCOUNT.USERID }, true);
        public static Index USERACCOUNT_USERNAME = Internal.createIndex("userName", Useraccount.USERACCOUNT, new OrderField[] { Useraccount.USERACCOUNT.USERNAME }, true);
        public static Index USERFILE_PRIMARY = Internal.createIndex("PRIMARY", Userfile.USERFILE, new OrderField[] { Userfile.USERFILE.FILEID }, true);
        public static Index USERFILE_USERID = Internal.createIndex("userID", Userfile.USERFILE, new OrderField[] { Userfile.USERFILE.USERID, Userfile.USERFILE.NAME }, true);
    }
}
