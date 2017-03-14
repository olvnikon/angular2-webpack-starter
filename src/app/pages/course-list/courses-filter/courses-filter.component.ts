import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'courses-filter',
  templateUrl: './courses-filter.component.html',
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
