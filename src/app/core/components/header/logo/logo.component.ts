import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-logo',
  templateUrl: './logo.component.html',
  styles: [require('./logo.component.scss')],
  providers: [],
})
export class LogoComponent {
  @Input() image: string;

  constructor() {

  }
}
