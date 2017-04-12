import { Component } from '@angular/core';
import template from './edit-course.component.html';

@Component({
  template,
  selector: 'edit-course',
  styles: [require('./edit-course.component.scss')],
})
export class EditCourseComponent {
  private authors = [
    { name: 'Smith', isSelected: false },
    { name: 'Johnson', isSelected: false },
    { name: 'Williams', isSelected: false },
    { name: 'Miller', isSelected: true },
    { name: 'Brown', isSelected: true },
  ];

  public save() {
    //
  }

  public cancel() {
    //
  }
}
