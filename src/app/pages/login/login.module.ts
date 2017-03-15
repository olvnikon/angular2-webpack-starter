import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services';

@NgModule({
  declarations: [
    LoginComponent,
  ],
})
export class LoginModule {
  constructor(private authService: AuthService) {

  }

  private login(formValues) {
    this.authService.login(formValues.userName, formValues.password)
      .subscribe(response => {
        // ToDo: complete the logic
      });
  }
}
