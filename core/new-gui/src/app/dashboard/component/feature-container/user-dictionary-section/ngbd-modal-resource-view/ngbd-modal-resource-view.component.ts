import { Component, ComponentRef, Optional, Inject } from '@angular/core';
import { UserDictionary } from '../../../../service/user-dictionary/user-dictionary.interface';
import { UserDictionaryService } from '../../../../service/user-dictionary/user-dictionary.service';

import { ZorroModalDialogueComponent } from '../../../../../abstract-component/zorro-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';

/**
 * NgbdModalResourceViewComponent is the pop-up component to
 * let user view each dictionary. It allows user to add items
 * into a dictionary or remove a item from dictionary.
 *
 * @author Zhaomin Li
 */
@Component({
  selector: 'texera-resource-section-modal',
  templateUrl: './ngbd-modal-resource-view.component.html',
  styleUrls: ['./ngbd-modal-resource-view.component.scss', '../../../dashboard.component.scss'],
  providers: [
    UserDictionaryService,
  ]
})
export class NgbdModalResourceViewComponent extends ZorroModalDialogueComponent<boolean> {

  public dictionary: UserDictionary = {
    name: '',
    id: '',
    items: []
  };

  public name: string = '';
  public ifAdd = false;
  public removable = true;
  public visible = true;
  public selectable = true;

  constructor(
    private userDictionaryService: UserDictionaryService,
    @Optional() @Inject('ComponentRefPromise') ref: Promise<ComponentRef<NgbdModalResourceViewComponent>>,
    modal: NzModalService
    ) {
    super(ref);
  }

  /**
  * addDictionaryItem gets the item added by user and sends it back to the main component.
  *
  * @param
  */
  public addDictionaryItem(): void {

    if (this.ifAdd && this.name !== '') {
      this.dictionary.items.push(this.name);
      this.userDictionaryService.putUserDictionaryData(this.dictionary).subscribe();

      this.name = '';
    }
    this.ifAdd = !this.ifAdd;

  }

  /**
  * remove gets the item deleted by user and sends the message to the main component.
  *
  * @param item: name of the dictionary item
  */
  public remove(item: string): void {

    this.dictionary.items = this.dictionary.items.filter(dictItems => dictItems !== item);
    this.userDictionaryService.putUserDictionaryData(this.dictionary).subscribe();
  }

}


