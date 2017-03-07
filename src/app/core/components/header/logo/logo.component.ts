import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-logo',
  templateUrl: './logo.component.html',
  styles: [require('./logo.component.scss')],
})
export class LogoComponent {
  @Input() private image: string;
}
