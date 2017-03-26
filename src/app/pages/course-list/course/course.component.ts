import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../../core/entities';
import template from './course.component.html';

@Component({
  template,
  selector: 'course',
  styles: [require('./course.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {
  @Input() public course: Course;
  @Output() public deleteCourse = new EventEmitter();
  @Output() public editCourse = new EventEmitter();

  public onDeleteCourse() {
    if (confirm('Do you really want to delete this course?')) {
      this.deleteCourse.emit({ course: this.course });
    }
  }

  public onEditCourse() {
    this.editCourse.emit({ course: this.course });
  }
}
