import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavLink } from '../../../entities';
import template from './navigation.component.html';

@Component({
  template,
  selector: 'header-nav',
  styles: [require('./navigation.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() private urls: NavLink[];
}
