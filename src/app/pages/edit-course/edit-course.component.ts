import { Component, OnInit } from '@angular/core';
import template from './edit-course.component.html';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateDate, validateNumbersOnly, atLeastOne } from '../../core/validators';
import { AuthorService, } from '../../core/services';
import { Author, } from '../../core/entities';

@Component({
  template,
  selector: 'edit-course',
  styles: [require('./edit-course.component.scss')],
})
export class EditCourseComponent implements OnInit {
  public formGroup: FormGroup;
  public authors: Author[] = [];
  private maxTitleLength: number = 50;
  private maxDescriptionLength: number = 500;

  constructor(private formBuilder: FormBuilder, private authorService: AuthorService) {

  }

  public ngOnInit(): void {
    this.authorService
      .authorsObservable
      .subscribe((authors: Author[]) => (this.authors = authors));
    this.authorService.loadAll();

    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxTitleLength)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxDescriptionLength)]],
      date: ['', [Validators.required, validateDate]],
      duration: ['', [Validators.required, validateNumbersOnly]],
      authors: [[], [Validators.required, atLeastOne]],
    });
  }

  public getErrorClass(control: FormControl): string {
    return control.dirty && !!control.errors ?
      'has-error' : '';
  }

  public save(form: FormGroup) {
    console.log(form);
  }

  public cancel(form: FormGroup) {
    form.reset();
  }
}
