import { Component, Input } from '@angular/core';
import { Course } from '../../core/entities';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styles: [require('./course-list.component.scss')],
  providers: [],
})
export class CourseListComponent {
  @Input() private courses: Course[];
}
