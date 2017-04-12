import { Directive, ElementRef, AfterViewInit } from '@angular/core';

declare const $: any;

@Directive({
  selector: '[dual-box]'
})
export class DualBoxDirective implements AfterViewInit {
  constructor(private el: ElementRef) {

  }

  public ngAfterViewInit() {
    $(this.el.nativeElement).bootstrapDualListbox();
  }
}
