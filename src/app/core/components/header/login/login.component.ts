import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services';
import template from './login.component.html';

@Component({
  template,
  selector: 'header-login',
  styles: [require('./login.component.scss')]
})
export class LoginComponent {
  @Output() private onLogin = new EventEmitter();

  constructor(private authService: AuthService) {}

  public get userName(): string {
    return this.authService.getUserInfo();
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
