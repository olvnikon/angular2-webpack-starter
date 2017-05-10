import { Injectable } from '@angular/core';
import { LoggedUser, LoginResponse } from '../entities';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Backend } from './backend.service';

@Injectable()
export class AuthService {
  public userInfo: BehaviorSubject<LoggedUser> = new BehaviorSubject(null);
  private url: string = 'http://localhost:2403/users';

  constructor(private http: Backend) {
  }

  public isAuthenticated(): boolean {
    return !!this.userInfo.getValue();
  }

  public get userInfoObservable(): Observable<LoggedUser> {
    return this.userInfo.asObservable();
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
        this.userInfo.next(user);
      });
  }

  public logout() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http
      .post(`${this.url}/logout`, JSON.stringify({}), options)
      .do(() => {
        this.userInfo.next(null);
      });
  }
}
