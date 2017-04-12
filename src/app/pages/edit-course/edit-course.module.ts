import { NgModule } from '@angular/core';
import { EditCourseComponent } from './edit-course.component';
import { DualBoxDirective } from './directives';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../core/pipes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditCourseComponent,
    DualBoxDirective,
  ],
  exports: [
    EditCourseComponent,
  ],
  imports: [
    BrowserModule,
    PipesModule,
    FormsModule,
  ],
  providers: [],
})
export class EditCourseModule {

}
