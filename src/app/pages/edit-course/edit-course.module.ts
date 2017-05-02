import { NgModule } from '@angular/core';
import { EditCourseComponent } from './edit-course.component';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from '../../core/pipes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DurationControlComponent,
  DateControlComponent,
  AuthorsControlComponent,
} from './controls';

@NgModule({
  declarations: [
    EditCourseComponent,
    DurationControlComponent,
    DateControlComponent,
    AuthorsControlComponent,
  ],
  exports: [
    EditCourseComponent,
  ],
  imports: [
    BrowserModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class EditCourseModule {

}
