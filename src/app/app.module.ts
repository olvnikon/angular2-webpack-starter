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
  Backend,
} from './core/services';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import {
  CanActivateCourses,
  CanActivateLogin,
} from './core/route-guards';

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
    CanActivateCourses,
    CanActivateLogin,
    {
      provide: Backend,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new Backend(backend, options);
      },
      deps: [XHRBackend, RequestOptions],
    },
  ],
})
export class AppModule {

}
