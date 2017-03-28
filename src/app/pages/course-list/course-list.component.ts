import {
  Component, OnInit,
} from '@angular/core';
import { Course } from '../../core/entities';
import { CourseService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import template from './course-list.component.html';

@Component({
  template,
  selector: 'course-list',
  styles: [require('./course-list.component.scss')],
})
export class CourseListComponent implements OnInit {
  public courses: Course[];

  constructor(private courseService: CourseService,
              private spinnerService: SpinnerService
  ) {
  }

  public ngOnInit(): void {
    this.courseService
      .coursesObservable
      .subscribe(courses => {
        this.courses = courses;
        this.spinnerService.stopLoading();
      });

    this.spinnerService.runLoading();
    this.courseService.loadAll();
  }

  public findCourses(filter: { filterString: string }): void {
    console.log(filter.filterString);
  }

  public createCourse(course: Course): void {
    this.spinnerService.runLoading();
    this.courseService.create(course);
  }

  public editCourse(course: Course): void {
    this.courseService.getById(course.id)
      .subscribe(foundCourse => console.log(foundCourse));
  }

  public deleteCourse(course: Course): void {
    this.spinnerService.runLoading();
    this.courseService.remove(course);
  }
}
