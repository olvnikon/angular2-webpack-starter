import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';
import template from './login.component.html';
import { Store } from '@ngrx/store';
import { LoggedUser } from '../../../entities';
import { Observable } from 'rxjs/Observable';

@Component({
  template,
  selector: 'header-login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public userName: string;
  private loggedUser: Observable<LoggedUser>;

  constructor(private authService: AuthService,
              private ref: ChangeDetectorRef,
              private router: Router,
              private store: Store<LoggedUser>) {
    this.loggedUser = this.store.select<LoggedUser>('loggedUser');
  }

  public ngOnInit(): void {
    this.loggedUser.subscribe(loggedUser => {
      this.userName = loggedUser ?
        loggedUser.userName : '';
      this.ref.markForCheck();
    });
  }

  public logout(e): void {
    e.preventDefault();
    this.authService
      .logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
