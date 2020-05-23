import { Component, ComponentRef, Optional, Inject } from '@angular/core';
import { UserDictionary } from '../../../../service/user-dictionary/user-dictionary.interface';

import { ZorroModalDialogueComponent } from '../../../../../abstract-component/zorro-modal.component';

/**
 * NgbdModalResourceDeleteComponent is the pop-up
 * component for undoing the delete. User may cancel
 * a dictionary deletion.
 *
 * @author Zhaomin Li
 */
@Component({
  selector: 'texera-resource-section-delete-dict-modal',
  templateUrl: './ngbd-modal-resource-delete.component.html',
  styleUrls: ['./ngbd-modal-resource-delete.component.scss', '../../../dashboard.component.scss']

})
export class NgbdModalResourceDeleteComponent extends ZorroModalDialogueComponent<boolean> {

  public dictionary: UserDictionary = {
    name: '',
    id: '',
    items: []
  };

  constructor(
    @Optional() @Inject('ComponentRefPromise') ref: Promise<ComponentRef<NgbdModalResourceDeleteComponent>>
  ) {
    super(ref);
  }

  /**
  * deleteDictionary sends the user confirm to the frontend to delete
  * a certain dictionary in user storage.
  *
  * @param
  */
  public deleteDictionary(): void {
    this.closeModal(true);
  }

  public toggleModal(): void {
    if (this.isModalVisible) {
      this.isModalVisible = false;
    } else {
      this.isModalVisible = true;
    }
  }

}
