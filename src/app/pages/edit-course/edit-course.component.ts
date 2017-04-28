import { Component, OnInit } from '@angular/core';
import template from './edit-course.component.html';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateDate, validateNumbersOnly } from '../../core/validators';

@Component({
  template,
  selector: 'edit-course',
  styles: [require('./edit-course.component.scss')],
})
export class EditCourseComponent implements OnInit {
  public formGroup: FormGroup;
  private authors = [
    { name: 'Smith', isSelected: false },
    { name: 'Johnson', isSelected: false },
    { name: 'Williams', isSelected: false },
    { name: 'Miller', isSelected: true },
    { name: 'Brown', isSelected: true },
  ];

  constructor(private formBuilder: FormBuilder) {

  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, validateDate]],
      duration: ['', [validateNumbersOnly]],
      authors: [[], [Validators.required]],
    });
  }

  public save(form: FormGroup) {
    console.log(form);
  }

  public cancel(form: FormGroup) {
    form.reset();
  }
}
