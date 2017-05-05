import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import template from './header.component.html';

@Component({
  template,
  selector: 'main-header',
  styles: [require('./header.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

}
