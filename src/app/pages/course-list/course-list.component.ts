import {
  Component, OnDestroy, OnInit, Output, EventEmitter
} from '@angular/core';
import { Course } from '../../core/entities';
import { CourseService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import { SearchStringPipe } from './pipes';
import template from './course-list.component.html';

@Component({
  template,
  selector: 'course-list',
  styles: [require('./course-list.component.scss')],
})
export class CourseListComponent implements OnInit, OnDestroy {
  public courses: Course[];

  private allCourses: Course[];
  private subscription;
  @Output() private onPageChange = new EventEmitter();

  constructor(private courseService: CourseService,
              private spinnerService: SpinnerService,
              private searchString: SearchStringPipe) {
  }

  public ngOnInit(): void {
    this.subscription = this.courseService
      .coursesObservable
      .subscribe(courses => {
        this.courses = courses;
        this.allCourses = courses;
        this.spinnerService.stopLoading();
      });

    this.spinnerService.runLoading();
    this.courseService.loadAll();
  }

  public findCourses(filter: { filterString: string }): void {
    this.courses = this.searchString.transform(this.allCourses, filter.filterString);
  }

  public createCourse(): void {
    this.onPageChange.emit({ toPage: 'edit-course' });
  }

  public editCourse(course: Course): void {
    this.courseService.getById(course.id)
      .subscribe(foundCourse => console.log(foundCourse));
  }

  public deleteCourse(course: Course): void {
    this.spinnerService.runLoading();
    this.courseService.remove(course);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
