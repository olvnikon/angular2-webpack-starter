import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
  ],
  providers: [],
})
export class LoginModule {
  constructor(private authService: AuthService) {

  }

  private login(formValues) {
    // this.authService.login(formValues.userName, formValues.password)
    //   .subscribe(response => {
    //     // ToDo: complete the logic
    //   });
  }
}
