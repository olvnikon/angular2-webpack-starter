import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { CourseComponent } from './course';
import { CoursesFilterComponent } from './courses-filter';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseComponent,
    CoursesFilterComponent,
  ],
  providers: [],
  exports: [],
  imports: [],
})
export class CourseListModule {

}
