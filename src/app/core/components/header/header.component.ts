import { Component, EventEmitter, Input, Output } from '@angular/core';
import template from './header.component.html';

@Component({
  template,
  selector: 'main-header',
  styles: [require('./header.component.scss')],
})
export class HeaderComponent {
  @Input() private pageName: string;
  @Output() private onPageChange = new EventEmitter();

  public goToLoginPage() {
    this.onPageChange.emit({ toPage: 'login' });
  }

  public goToHomePage() {
    this.onPageChange.emit({ toPage: 'course-list' });
  }
}
