import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit,
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
export class LoginComponent implements OnInit {
  public userName: string;
  @Output() private onLogin = new EventEmitter();

  constructor(private authService: AuthService, private ref: ChangeDetectorRef) {

  }

  public ngOnInit(): void {
    this.authService
      .userInfoObservable
      .subscribe(loggedUser => {
        this.userName = loggedUser ?
          loggedUser.userName : '';
        this.ref.markForCheck();
      });
  }

  public login(e): void {
    e.preventDefault();
    this.onLogin.emit();
  }

  public logout(e): void {
    e.preventDefault();
    this.authService.logout();
  }
}
