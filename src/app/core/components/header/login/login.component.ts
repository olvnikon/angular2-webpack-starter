import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter,
  Output
} from '@angular/core';
import { AuthService } from '../../../services';
import template from './login.component.html';

@Component({
  template,
  selector: 'header-login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public userName: string;
  @Output() private onLogin = new EventEmitter();

  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {
    this.authService
      .getUserInfo()
      .subscribe(loggedUser => {
        this.userName = loggedUser ?
          loggedUser.userName : '';
        this.ref.markForCheck();
      });
  }

  public login(e) {
    e.preventDefault();
    this.onLogin.emit();
  }

  public logout(e) {
    e.preventDefault();
    this.authService.logout();
  }
}
