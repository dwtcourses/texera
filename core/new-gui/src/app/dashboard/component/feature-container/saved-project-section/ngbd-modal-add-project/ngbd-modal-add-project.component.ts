import { Component, ComponentRef, Optional, Inject } from '@angular/core';
import { ZorroModalDialogueComponent } from '../../../../../abstract-component/zorro-modal.component';
/**
 * NgbdModalAddProjectComponent is the pop-up component
 * to let user create new project. User needs to specify
 * the project name.
 *
 * @author Zhaomin Li
 */
@Component({
  selector: 'texera-add-project-section-modal',
  templateUrl: 'ngbd-modal-add-project.component.html',
  styleUrls: ['../../../dashboard.component.scss', 'ngbd-modal-add-project.component.scss']
})
export class NgbdModalAddProjectComponent extends ZorroModalDialogueComponent<string> {
  public name: string = '';

  constructor(@Optional() @Inject('ComponentRefPromise') ref: Promise<ComponentRef<NgbdModalAddProjectComponent>>) {
    super(ref);
  }

  /**
  * addProject records the project information and return
  * it to the main component. It does not call any method in service.
  *
  * @param
  */
  public addProject(): void {
    if (this.name !== '') {
      this.closeModal(this.name);
    } else {
      $('#warning').text('Please input the project name!');
    }
  }
}
