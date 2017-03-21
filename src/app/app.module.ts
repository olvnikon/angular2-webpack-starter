import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  CourseDetailsModule,
  CourseListModule,
  LoginModule,
} from './pages';
import {
  FooterModule,
  HeaderModule,
} from './core/components';
import {
  AuthService,
  CourseService,
} from './core/services';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    CourseDetailsModule,
    CourseListModule,
    LoginModule,
    FooterModule,
    HeaderModule,
    HttpModule,
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
  ],
})
export class AppModule {

}
