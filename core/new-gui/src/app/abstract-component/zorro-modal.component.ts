import { Component, Output, EventEmitter, ComponentRef, Optional, Inject } from '@angular/core';


@Component({
  template: '< <nz-modal [nzVisible]="isModalVisible">Abstract ZorroModal</nz-modal>',
})
export abstract class ZorroModalComponent {
  public isModalVisible = true; // controls visibility via attribute binding in template

  constructor(@Optional() @Inject('ComponentRefPromise') private refPromise: Promise<ComponentRef<ZorroModalComponent>>) {}

  public hideModal(): void {
    this.isModalVisible = false;
  }

  public showModal(): void {
    this.isModalVisible = true;
  }

  public toggleModal(): void {
    if (this.isModalVisible) {
      this.isModalVisible = false;
    } else {
      this.isModalVisible = true;
    }
  }

  public closeModal(): void {
    this.hideModal();
    if (this.refPromise) {
      this.refPromise.then((ref) => {
        ref.destroy();
      });
    }
  }

  public dismissModal(): void {
    this.hideModal();
    if (this.refPromise) {
      this.refPromise.then((ref) => {
        ref.destroy();
      });
    }
  }
}

@Component({
  template: '<nz-modal [(nzVisible)]="isModalVisible">Abstract ZorroModal</nz-modal>',
})
export abstract class ZorroModalDialogueComponent<T>  extends ZorroModalComponent {
  public result: Promise<T>;
  private resolveResult: (value?: T) => void;
  private rejectResult: (value?: T) => void;

  constructor(@Optional() @Inject('ComponentRefPromise') ref: Promise<ComponentRef<ZorroModalDialogueComponent<T>>>) {
    super(ref);
    this.resolveResult = () => {console.warn('NgbdModalDeleteProjectComponent constructor malfunction'); };
    this.rejectResult = () => {console.warn('NgbdModalDeleteProjectComponent constructor malfunction'); };
    this.result = new Promise<T>((resolve, reject) => {this.resolveResult = resolve; this.rejectResult = reject; });
  }

  public closeModal(value?: T): void {
    this.resolveResult(value);
    super.closeModal();
  }

  public dismissModal(value?: T): void {
    this.rejectResult(value);
    super.dismissModal();
  }
}
