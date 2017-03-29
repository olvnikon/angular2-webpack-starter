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

  public ngOnInit(): void {
    let startTime = Date.now();
    this.ngZone.onUnstable.subscribe(() => {
      startTime = Date.now();
    });
    this.ngZone.onStable.subscribe(() => {
      console.log(`${Date.now() - startTime} ms`);
    });
  }

  public goToPage(e): void {
    this.pageName = e.toPage;
  }
}
