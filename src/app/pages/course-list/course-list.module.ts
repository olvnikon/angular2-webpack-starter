import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { CourseComponent } from './course';
import { CoursesFilterComponent } from './courses-filter';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseComponent,
    CoursesFilterComponent,
  ],
  exports: [
    CourseListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
  ],
})
export class CourseListModule {

}
