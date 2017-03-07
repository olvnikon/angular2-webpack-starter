import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../core/entities';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styles: [require('./course.component.scss')],
})
export class CourseComponent {
  @Input() private course: Course;
  @Output() private deleteCourse = new EventEmitter();
  @Output() private editCourse = new EventEmitter();

  private onDeleteCourse() {
    this.deleteCourse.emit({ course: this.course });
  }

  private onEditCourse() {
    this.editCourse.emit({ course: this.course });
  }
}
