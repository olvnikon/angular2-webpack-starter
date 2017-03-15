import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../core/entities';
import template from './course.component.html';

@Component({
  template,
  selector: 'course',
  styles: [require('./course.component.scss')],
})
export class CourseComponent {
  @Input() public course: Course;
  @Output() public deleteCourse = new EventEmitter();
  @Output() public editCourse = new EventEmitter();

  public onDeleteCourse() {
    this.deleteCourse.emit({ course: this.course });
  }

  public onEditCourse() {
    this.editCourse.emit({ course: this.course });
  }
}
