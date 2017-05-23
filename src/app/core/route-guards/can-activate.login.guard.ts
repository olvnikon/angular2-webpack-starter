import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggedUser } from '../entities';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateLogin implements CanActivate {
  private loggedUser: Observable<LoggedUser>;

  public constructor(private store: Store<LoggedUser>) {
    this.loggedUser = this.store.select<LoggedUser>('loggedUser');
  }

  public canActivate(): Observable<boolean> {
    return this.loggedUser
      .map(loggedUser => !loggedUser);
  }
}
