import {
  Component, OnInit,
} from '@angular/core';
import { Course } from '../../core/entities';
import { CourseService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import template from './course-list.component.html';
import { Store } from '@ngrx/store';

@Component({
  template,
  selector: 'course-list',
  styles: [require('./course-list.component.scss')],
})
export class CourseListComponent implements OnInit {
  public courses: Course[];
  public totalCount: number = 0;
  public activePage: number = 1;
  public itemsPerPage: number = 3;
  private coursesStore = null;
  private coursesCountSubscription = null;
  private filterString: string = '';

  constructor(private courseService: CourseService,
              private spinnerService: SpinnerService,
              private store: Store<Course[]>) {
    this.coursesStore = this.store.select<Course[]>('courses');
  }

  public ngOnInit(): void {
    this.courseServiceSubscribe();
    this.spinnerService.runLoading();
    this.courseService.loadAll(this.activePage, this.itemsPerPage);
    this.courseService.countAll();
  }

  public findCourses(filter: { filterString: string }): void {
    this.filterString = filter.filterString;
    this.courseService.loadAll(1, this.itemsPerPage, filter.filterString);
    this.courseService.countAll(filter.filterString);
  }

  public deleteCourse(course: Course): void {
    this.spinnerService.runLoading();
    this.courseService.remove(course)
      .subscribe(() => {
        this.findCourses({ filterString: this.filterString });
      });
  }

  public changePage(event) {
    this.activePage = event.activePage;
    this.courseService.loadAll(event.activePage);
  }

  private courseServiceSubscribe() {
    this.coursesStore
      .subscribe(courses => {
        this.courses = courses;
        this.spinnerService.stopLoading();
      });
    this.coursesCountSubscription = this.courseService
      .coursesCountObservable
      .subscribe(count => {
        this.totalCount = count;
      });
  }
}
