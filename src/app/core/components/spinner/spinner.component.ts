import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';
import template from './spinner.component.html';
import { Observable } from 'rxjs';

@Component({
  template,
  selector: 'spinner',
  styles: [require('./spinner.component.scss')],
})
export class SpinnerComponent {
  constructor(private spinnerApi: SpinnerService) {}

  public get show(): Observable<boolean> {
    return this.spinnerApi.show;
  }
}
