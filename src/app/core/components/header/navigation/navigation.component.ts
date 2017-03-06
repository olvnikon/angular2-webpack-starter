import { Component, Input } from '@angular/core';

@Component({
  selector: 'header-nav',
  templateUrl: './navigation.component.html',
  styles: [require('./navigation.component.scss')],
  providers: []
})
export class NavigationComponent {
  @Input() urls: string[];
}
