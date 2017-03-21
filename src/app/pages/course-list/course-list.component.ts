import { Component, Input } from '@angular/core';
import { Course } from '../../core/entities';
import { CourseService } from '../../core/services';
import template from './course-list.component.html';

@Component({
  template,
  selector: 'course-list',
  styles: [require('./course-list.component.scss')],
})
export class CourseListComponent {
  constructor(private courseService: CourseService) {}

  public get courses() {
    return this.courseService.getAll();
  }

  public deleteCourse(course: Course) {
    this.courseService.remove(course);
  }
}
