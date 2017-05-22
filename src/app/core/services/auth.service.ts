import { Injectable } from '@angular/core';
import { LoggedUser, LoginResponse } from '../entities';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Backend } from './backend.service';
import { Store } from '@ngrx/store';
import { LOG_IN, LOG_OUT } from '../reducers';

@Injectable()
export class AuthService {
  private loggedUser: Observable<LoggedUser> = null;
  private url: string = 'http://localhost:2403/users';

  constructor(private http: Backend, private store: Store<LoggedUser>) {
    this.loggedUser = this.store.select<LoggedUser>('loggedUser');
  }

  public login(username: string, password: string): Observable<LoggedUser> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const loginInfo = { username, password };

    return this.http.post(`${this.url}/login`, JSON.stringify(loginInfo), options)
      .map((response: Response): LoginResponse => response.status === 200 ? response.json() : null)
      .catch(() => Observable.of(null))
      .map((response: LoginResponse): LoggedUser => (
        response ?
          { id: response.uid, userName: username, token: response.id } : null
      ))
      .do((user: LoggedUser) => {
        this.store.dispatch({ type: LOG_IN, payload: user });
      });
  }

  public logout() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http
      .post(`${this.url}/logout`, JSON.stringify({}), options)
      .do(() => {
        this.store.dispatch({ type: LOG_OUT });
      });
  }
}
