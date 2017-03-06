import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  CourseDetailsModule,
  CourseListModule,
  LoginModule,
} from './pages';

@NgModule({
  imports: [
    BrowserModule,
    CourseDetailsModule,
    CourseListModule,
    LoginModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
})
export class AppModule {

}
