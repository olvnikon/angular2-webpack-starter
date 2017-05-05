import { ChangeDetectionStrategy, Component } from '@angular/core';
import template from './no-content.component.html';

@Component({
  template,
  selector: 'no-content',
  styles: [
    require('./no-content.component.scss'),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent {

}
