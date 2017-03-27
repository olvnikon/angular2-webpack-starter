import { Injectable } from '@angular/core';
import { LoggedUser } from '../entities';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  private userInfo = <BehaviorSubject<LoggedUser>> new BehaviorSubject(null);

  constructor(private http: Http) {}

  public login() {
    this.userInfo.next({
      id: 1,
      userName: 'Vladimir'
    });
  }

  public logout() {
    this.userInfo.next(null);
  }

  public isAuthenticated(): boolean {
    return !!this.userInfo.getValue();
  }

  public getUserInfo(): Observable<LoggedUser> {
    return this.userInfo.asObservable();
  }

  public login_normal(userName: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const loginInfo = { userName, password };

    return this.http.post('/api/login/', JSON.stringify(loginInfo), options)
      .do((response: Response) => {
        if (response) {
          // this.loggedUser = <LoggedUser> response.json().user;
        }
      });
  }

  public logout_normal() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    // this.loggedUser = undefined;

    return this.http.post('/api/logout', JSON.stringify({}), options);
  }

  public checkAuthenticationStatus_normal() {
    // ToDo: this method should check authentication after page refresh
  }
}
