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
  public totalCount: number = 0;
  public activePage: number = 1;
  public itemsPerPage: number = 3;
  private coursesSubscription = null;
  private coursesCountSubscription = null;

  constructor(private courseService: CourseService,
              private spinnerService: SpinnerService) {
  }

  public ngOnInit(): void {
    this.courseServiceSubscribe();
    this.spinnerService.runLoading();
    this.courseService.loadAll(this.activePage, this.itemsPerPage);
    this.courseService.countAll();
  }

  public findCourses(filter: { filterString: string }): void {
    this.courseService.loadAll(1, this.itemsPerPage, filter.filterString);
    this.courseService.countAll(filter.filterString);
  }

  public deleteCourse(course: Course): void {
    this.spinnerService.runLoading();
    this.courseService.remove(course);
  }

  public changePage(event) {
    this.activePage = event.activePage;
    this.courseService.loadAll(event.activePage);
  }

  private courseServiceSubscribe() {
    this.coursesSubscription = this.courseService
      .coursesObservable
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
