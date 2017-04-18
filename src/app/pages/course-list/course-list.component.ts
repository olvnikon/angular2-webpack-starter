import {
  Component, OnInit, Output, EventEmitter
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
export class CourseListComponent implements OnInit {
  public courses: Course[];
  public totalCount: number = 0;
  public activePage: number = 1;
  public itemsPerPage: number = 3;
  @Output() private onPageChange = new EventEmitter();

  constructor(private courseService: CourseService,
              private spinnerService: SpinnerService,
              private searchString: SearchStringPipe) {
  }

  public ngOnInit(): void {
    this.spinnerService.runLoading();
    this.courseService
      .getAll(1, this.itemsPerPage)
      .subscribe(courses => {
        this.courses = courses;
        this.spinnerService.stopLoading();
      });

    this.courseService
      .count()
      .subscribe(count => {
        this.totalCount = count;
      });
  }

  public findCourses(filter: { filterString: string }): void {
    this.courses = this.searchString.transform(this.courses, filter.filterString);
  }

  public createCourse(): void {
    this.onPageChange.emit({ toPage: 'edit-course' });
  }

  public editCourse(course: Course): void {
    //
  }

  public deleteCourse(course: Course): void {
    this.spinnerService.runLoading();
    this.courseService.remove(course);
  }

  public changePage(event) {
    this.courseService
      .getAll(event.activePage)
      .subscribe(courses => {
        this.activePage = event.activePage;
        this.courses = courses;
        this.spinnerService.stopLoading();
      });
  }
}
