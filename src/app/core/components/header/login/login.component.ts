import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';
import template from './login.component.html';
import { Store } from '@ngrx/store';
import { LoggedUser } from '../../../entities';

@Component({
  template,
  selector: 'header-login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public userName: string;

  constructor(private authService: AuthService,
              private ref: ChangeDetectorRef,
              private router: Router,
              private store: Store<LoggedUser>) {

  }

  public ngOnInit(): void {
    this.store.subscribe(loggedUser => {
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
