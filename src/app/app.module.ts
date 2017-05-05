import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  CourseDetailsModule,
  CourseListModule,
  LoginModule,
  EditCourseModule,
  NoContentModule,
} from './pages';
import { CoreModule } from './core/components/core.module';
import {
  AuthService,
  CourseService,
  AuthorService,
} from './core/services';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    CourseDetailsModule,
    CourseListModule,
    LoginModule,
    NoContentModule,
    CoreModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
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
