import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Course } from '../../core/entities';
import { CourseService } from '../../core/services';
import template from './course-list.component.html';

@Component({
  template,
  selector: 'course-list',
  styles: [require('./course-list.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  public courses: Course[];

  constructor(private courseService: CourseService) {
    this.courseService.getAll().subscribe(courses => {
      this.courses = courses;
    });
  }

  public editCourse(course: Course) {
    this.courseService.getById(course.id)
      .subscribe(foundCourse => console.log(foundCourse));
  }

  public deleteCourse(course: Course) {
    this.courseService.remove(course);
  }
}
