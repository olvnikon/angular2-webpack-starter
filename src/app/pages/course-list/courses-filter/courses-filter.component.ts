import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'courses-filter'
})
export class CoursesFilterComponent {
  filterString: string;
  @Output() filter = new EventEmitter();

  constructor() {

  }

  onFilterStringChange() {
    this.filter.emit({
      filterString: this.filterString
    });
  }
}
