import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import template from './app.component.html';

@Component({
  template,
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public pageName: string = 'course-list';

  public goToPage(e) {
    this.pageName = e.toPage;
  }
}
