import { Component, Input } from '@angular/core';
import { Course } from '../../../core/entities';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styles: [require('./course.component.scss')],
  providers: [],
})
export class CourseComponent {
  @Input() course: Course;

  constructor() {

  }
}
