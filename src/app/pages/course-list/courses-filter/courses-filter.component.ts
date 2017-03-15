import { Component, Output, EventEmitter } from '@angular/core';
import template from './courses-filter.component.html';

@Component({
  template,
  selector: 'courses-filter',
  styles: [require('./courses-filter.component.scss')],
})
export class CoursesFilterComponent {
  public filterString: string;
  @Output() private filter = new EventEmitter();

  public find() {
    console.log(this.filterString);
    // this.filter.emit({
    //   filterString: this.filterString
    // });
  }
}
