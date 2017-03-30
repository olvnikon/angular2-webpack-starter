import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CourseListComponent } from './course-list.component';
import { CourseComponent } from './course';
import { CoursesFilterComponent } from './courses-filter';
import { CourseFreshnessDirective } from './directives';
import { NoContentComponent } from './no-content';
import {
  DurationPipe,
  DateOrderPipe,
  SearchStringPipe,
} from './pipes';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseComponent,
    CoursesFilterComponent,
    CourseFreshnessDirective,
    NoContentComponent,
    DurationPipe,
    DateOrderPipe,
    SearchStringPipe,
  ],
  exports: [
    CourseListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
  ],
  providers: [
    SearchStringPipe,
  ]
})
export class CourseListModule {

}
