import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo';
import { NavigationComponent } from './navigation';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    NavigationComponent,
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
  constructor() {

  }
}
