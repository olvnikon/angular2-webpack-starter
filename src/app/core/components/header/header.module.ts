import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo';
import { NavigationComponent } from './navigation';
import { LoginComponent } from './login';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
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
    HeaderComponent,
  ],
})
export class HeaderModule {

}
