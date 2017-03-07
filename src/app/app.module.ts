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
} from './core/services';

@NgModule({
  imports: [
    BrowserModule,
    CourseDetailsModule,
    CourseListModule,
    LoginModule,
    FooterModule,
    HeaderModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AuthService,
  ],
})
export class AppModule {

}
