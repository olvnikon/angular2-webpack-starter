import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../../core/entities';
import template from './courses-filter.component.html';

@Component({
  template,
  selector: 'courses-filter',
  styles: [require('./courses-filter.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesFilterComponent {
  public filterString: string;
  public sortBy: string = 'date';
  @Output() private filter = new EventEmitter();
  @Output() private create = new EventEmitter();

  public find(): void {
    this.filter.emit({
      filterString: this.filterString
    });
  }

  public createCourse(): void {
    this.create.emit();
  }
}
