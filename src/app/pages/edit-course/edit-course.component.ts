import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import template from './edit-course.component.html';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateDate, validateNumbersOnly, atLeastOne } from '../../core/validators';
import { AuthorService, CourseService, } from '../../core/services';
import { Author, Course, } from '../../core/entities';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SpinnerService } from '../../core/components/spinner';

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
  private activeCourse: Observable<Course>;
  private courseId: string = '';

  constructor(private formBuilder: FormBuilder,
              private courseService: CourseService,
              private authorService: AuthorService,
              private activatedRoute: ActivatedRoute,
              private spinnerService: SpinnerService,
              private router: Router,
              private store: Store<Course>) {
    this.activeCourse = this.store.select<Course>('activeCourse');
  }

  public ngOnInit(): void {
    this.buildForm();
    this.initForm();
    this.loadAllAuthors();
  }

  public getErrorClass(control: FormControl): string {
    return control.dirty && !!control.errors ?
      'has-error' : '';
  }

  public save(form: FormGroup) {
    this.spinnerService.runLoading();
    const course = {
      id: this.courseId,
      name: form.controls.title.value,
      duration: form.controls.duration.value,
      date: new Date(form.controls.date.value),
      description: form.controls.description.value,
      votes: 0,
      authors: form.controls.authors.value
    };

    if (!!this.courseId) {
      this.courseService.update(course, this.courseId);
    } else {
      this.courseService.create(course);
    }
  }

  public cancel() {
    this.router.navigate(['/courses']);
  }

  private initForm() {
    this.activatedRoute.params.subscribe(params => {
      if (!params.id) {
        return;
      }

      this.activeCourse.subscribe(course => course && this.fillForm(course));
      this.courseService.loadOne(params.id);
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
    this.courseId = course.id;
    this.formGroup.controls.title.setValue(course.name);
    this.formGroup.controls.description.setValue(course.description);
    this.formGroup.controls.date.setValue(course.date.toLocaleDateString());
    this.formGroup.controls.duration.setValue(course.duration);
    this.formGroup.controls.authors.setValue([...course.authors]);
    this.spinnerService.stopLoading();
  }
}
