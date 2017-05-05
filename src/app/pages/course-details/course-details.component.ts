import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import template from './course-details.component.html';

@Component({
  template,
  selector: 'course-details',
  styles: [require('./course-details.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {

  }

  public ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => console.log(params));
  }
}
