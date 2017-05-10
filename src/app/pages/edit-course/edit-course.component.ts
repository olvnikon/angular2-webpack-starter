import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import template from './edit-course.component.html';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateDate, validateNumbersOnly, atLeastOne } from '../../core/validators';
import { AuthorService, CourseService, } from '../../core/services';
import { Author, Course, } from '../../core/entities';

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

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.initForm();
    this.loadAllAuthors();
    this.buildForm();
  }

  public getErrorClass(control: FormControl): string {
    return control.dirty && !!control.errors ?
      'has-error' : '';
  }

  public save(form: FormGroup) {
    this.courseService.create(
      {
        id: '',
        name: form.controls.title.value,
        duration: form.controls.duration.value,
        date: new Date(form.controls.date.value),
        description: form.controls.description.value,
        votes: 0,
        authors: []
      }
    );
  }

  public cancel(form: FormGroup) {
    form.reset();
  }

  private initForm() {
    this.activatedRoute
      .params
      .subscribe(params => {
        if (!params.id) {
          return;
        }

        this.courseService
          .getById(params.id)
          .subscribe(course => this.fillForm(course));
      });
  }

  private loadAllAuthors(): void {
    this.authorService
      .authorsObservable
      .subscribe((authors: Author[]) => (this.authors = authors));
    this.authorService.loadAll();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(this.maxTitleLength)]],
      description: ['', [Validators.required, Validators.maxLength(this.maxDescriptionLength)]],
      date: ['', [Validators.required, validateDate]],
      duration: ['', [Validators.required, validateNumbersOnly]],
      authors: [[], [Validators.required, atLeastOne]],
    });
  }

  private fillForm(course: Course): void {
    this.formGroup.controls.title.setValue(course.name);
    this.formGroup.controls.description.setValue(course.description);
    this.formGroup.controls.date.setValue(course.date.toLocaleDateString());
    this.formGroup.controls.duration.setValue(course.duration);
    this.formGroup.controls.authors.setValue([...course.authors]);
  }
}
