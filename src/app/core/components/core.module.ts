import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  SpinnerComponent,
  SpinnerService
} from './spinner';
import { FooterComponent } from './footer';
import {
  HeaderComponent,
  LoginComponent,
  LogoComponent,
  NavigationComponent,
} from './header';

@NgModule({
  declarations: [
    SpinnerComponent,
    FooterComponent,
    HeaderComponent,
    LogoComponent,
    NavigationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
  ],
  exports: [
    SpinnerComponent,
    FooterComponent,
    HeaderComponent,
  ],
  providers: [
    SpinnerService,
  ]
})
export class CoreModule {

}
