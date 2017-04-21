import { Injectable } from '@angular/core';
import { LoggedUser, LoginResponse } from '../entities';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  public userInfo: BehaviorSubject<LoggedUser> = new BehaviorSubject(null);
  private url: string = 'http://localhost:2403/users';

  constructor(private http: Http) {
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

    // this.loggedUser = undefined;

    return this.http.post('/api/logout', JSON.stringify({}), options);
  }

  public checkAuthenticationStatus_normal() {
    // ToDo: this method should check authentication after page refresh
  }
}
