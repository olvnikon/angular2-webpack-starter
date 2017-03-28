import {
  Component, NgZone, OnInit,
  ViewEncapsulation
} from '@angular/core';
import template from './app.component.html';

@Component({
  template,
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styleUrls: [
    './app.component.css',
    '../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
  ]
})
export class AppComponent implements OnInit {
  public pageName: string = 'course-list';

  constructor(private ngZone: NgZone) {

  }

  public ngOnInit() {
    let startTime = new Date();
    this.ngZone.onUnstable.subscribe(() => (startTime = new Date()));
    this.ngZone.onStable.subscribe(() => {
      console.log(`${new Date().getMilliseconds() - startTime.getMilliseconds()} ms`);
    });
  }

  public goToPage(e) {
    this.pageName = e.toPage;
  }
}
