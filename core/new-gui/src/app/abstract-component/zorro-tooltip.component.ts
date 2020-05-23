import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  template: '< <span nz-tooltip nzTooltipTitle="Abstract ZorroTooltip tip" [nzVisible]="isTooltipVisible">Abstract ZorroTooltip</span>',
})
export abstract class ZorroTooltipComponent {
  public isTooltipVisible = false; // controls visibility via attribute binding in template

  public hideTooltip(): void {
    this.isTooltipVisible = false;
  }

  public showTooltip(): void {
    this.isTooltipVisible = true;
  }

  public toggleTooltip(): void {
    if (this.isTooltipVisible) {
      this.isTooltipVisible = false;
    } else {
      this.isTooltipVisible = true;
    }
  }
}
