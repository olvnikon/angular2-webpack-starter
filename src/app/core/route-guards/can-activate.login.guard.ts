import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggedUser } from '../entities';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateLogin implements CanActivate {
  public constructor(private store: Store<LoggedUser>) {

  }

  public canActivate(): Observable<boolean> {
    return this.store.select('loggedUser')
      .filter(loggedUser => !loggedUser);
  }
}
