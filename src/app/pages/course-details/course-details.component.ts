import { ChangeDetectionStrategy, Component } from '@angular/core';
import template from './course-details.component.html';

@Component({
  template,
  selector: 'course-details',
  styles: [require('./course-details.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent {

}
