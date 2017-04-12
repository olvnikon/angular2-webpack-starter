import {
  Component, NgZone, OnInit,
  ViewEncapsulation
} from '@angular/core';
import template from './app.component.html';
import '../../node_modules/jquery/src/jquery.js';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../../node_modules/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.min.js';

@Component({
  template,
  encapsulation: ViewEncapsulation.None,
  selector: 'app',
  styles: [
    require('./app.component.scss'),
    require('../../node_modules/bootstrap/dist/css/bootstrap.min.css'),
    require('../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'),
    require('../../node_modules/bootstrap-duallistbox/src/bootstrap-duallistbox.css')
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
