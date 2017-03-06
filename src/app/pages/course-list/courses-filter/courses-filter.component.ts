import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'courses-filter',
  templateUrl: './courses-filter.component.html',
  styles: [require('./courses-filter.component.scss')],
  providers: [],
})
export class CoursesFilterComponent {
  private filterString: string;
  @Output() private filter = new EventEmitter();

  private onFilterStringChange() {
    this.filter.emit({
      filterString: this.filterString
    });
  }
}
