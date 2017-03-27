import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';
import template from './spinner.component.html';

@Component({
  template,
  selector: 'spinner',
  styles: [require('./spinner.component.scss')]
})
export class SpinnerComponent implements OnInit {
  public show: boolean = false;

  constructor(private spinnerApi: SpinnerService) {}

  public ngOnInit() {
    this.spinnerApi
      .show
      .subscribe(show => {
        this.show = show;
      });
  }
}
