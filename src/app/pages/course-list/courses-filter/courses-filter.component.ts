import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import template from './courses-filter.component.html';

@Component({
  template,
  selector: 'courses-filter',
  styles: [require('./courses-filter.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
