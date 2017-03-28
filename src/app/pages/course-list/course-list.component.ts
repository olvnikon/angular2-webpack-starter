import {
  ChangeDetectionStrategy, ChangeDetectorRef,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent implements OnInit {
  public courses: Course[];

  constructor(private courseService: CourseService,
              private spinnerService: SpinnerService,
              private ref: ChangeDetectorRef
  ) {
  }

  public ngOnInit() {
    this.courseService
      .coursesObservable
      .subscribe(courses => {
        this.courses = courses;
        this.spinnerService.stopLoading();
        this.ref.markForCheck();
      });

    this.spinnerService.runLoading();
    this.courseService.loadAll();
  }

  public editCourse(course: Course) {
    this.courseService.getById(course.id)
      .subscribe(foundCourse => console.log(foundCourse));
  }

  public deleteCourse(course: Course) {
    this.spinnerService.runLoading();
    this.courseService.remove(course);
  }
}
