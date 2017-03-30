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
    let startTime = performance.now();
    this.ngZone.onUnstable.subscribe(() => {
      startTime = performance.now();
    });
    this.ngZone.onStable.subscribe(() => {
      console.log(`${performance.now() - startTime} ms`);
    });
  }

  public goToPage(e): void {
    this.pageName = e.toPage;
  }
}
