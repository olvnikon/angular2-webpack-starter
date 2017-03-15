import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../core/entities';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
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
