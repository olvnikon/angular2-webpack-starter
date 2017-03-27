import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {
  CourseDetailsModule,
  CourseListModule,
  LoginModule,
} from './pages';
import { CoreModule } from './core/components/core.module';
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
    CoreModule,
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
