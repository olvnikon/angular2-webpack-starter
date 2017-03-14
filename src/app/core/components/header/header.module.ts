import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo';
import { NavigationComponent } from './navigation';
import { LoginComponent } from './login';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    NavigationComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
  ],
})
export class HeaderModule {

}
