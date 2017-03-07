import { Component, Input } from '@angular/core';
import { NavLink } from '../../../entities';

@Component({
  selector: 'header-nav',
  templateUrl: './navigation.component.html',
  styles: [require('./navigation.component.scss')],
})
export class NavigationComponent {
  @Input() private urls: NavLink[];
}
