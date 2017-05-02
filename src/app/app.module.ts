import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  CourseDetailsModule,
  CourseListModule,
  LoginModule,
  EditCourseModule,
} from './pages';
import { CoreModule } from './core/components/core.module';
import {
  AuthService,
  CourseService,
  AuthorService,
} from './core/services';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    CourseDetailsModule,
    CourseListModule,
    LoginModule,
    CoreModule,
    HttpModule,
    EditCourseModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AuthService,
    CourseService,
    AuthorService,
  ],
})
export class AppModule {

}
