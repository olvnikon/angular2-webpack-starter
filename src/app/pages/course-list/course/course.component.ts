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

  public onDeleteCourse(): void {
    // ToDo: implement normal modal window
    if (confirm('Do you really want to delete this course?')) {
      this.deleteCourse.emit({ course: this.course });
    }
  }

  public get popularityClass() {
    return this.course.votes < 5 ?
      'course__quite-popular' : 'course__popular';
  }

  public get courseClass() {
    return this.isPopular() ?
      'course_top-rated' : '';
  }

  public isPopular() {
    return this.course.votes >= 3;
  }
}
