import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
  ],
  template: `
    <main-header [pageName]="pageName" (onPageChange)="goToPage($event)"></main-header>
    <course-list *ngIf="pageName === 'course-list'"></course-list>
    <login *ngIf="pageName === 'login'"></login>
    <main-footer></main-footer>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public pageName: string = 'course-list';

  public goToPage(e) {
    this.pageName = e.toPage;
  }
}
