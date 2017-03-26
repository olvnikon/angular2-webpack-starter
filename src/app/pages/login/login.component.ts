import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../core/services';
import template from './login.component.html';

@Component({
  template,
  selector: 'login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  public login(e) {
    e.preventDefault();
    this.authService.login();
  }
}
