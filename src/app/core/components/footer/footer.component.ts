import { ChangeDetectionStrategy, Component } from '@angular/core';
import template from './footer.component.html';

@Component({
  template,
  selector: 'main-footer',
  styles: [require('./footer.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

}
