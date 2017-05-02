import { Component, OnInit } from '@angular/core';
import template from './edit-course.component.html';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateDate, validateNumbersOnly } from '../../core/validators';

@Component({
  template,
  selector: 'edit-course',
  styles: [require('./edit-course.component.scss')],
})
export class EditCourseComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  public get authors() {
    return [
      { name: 'Smith', isSelected: false },
      { name: 'Johnson', isSelected: false },
      { name: 'Williams', isSelected: false },
      { name: 'Miller', isSelected: false },
      { name: 'Brown', isSelected: false },
    ];
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      date: ['', [Validators.required, validateDate]],
      duration: ['', [Validators.required, validateNumbersOnly]],
      authors: [[], [Validators.required]],
    });
  }

  public hasErrors(control: FormControl): boolean {
    return control.dirty && !! control.errors;
  }

  public getErrorClass(control: FormControl): string {
    return this.hasErrors(control) ?
      'has-error' : '';
  }

  public save(form: FormGroup) {
    console.log(form);
  }

  public cancel(form: FormGroup) {
    form.reset();
  }
}
