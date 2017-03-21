import { Injectable } from '@angular/core';
import { LoggedUser } from '../entities';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  private loggedUser: LoggedUser;

  constructor(private http: Http) {

  }

  public login() {
    this.loggedUser = {
      id: 1,
      userName: 'Vladimir'
    };
  }

  public logout() {
    this.loggedUser = undefined;
  }

  public isAuthenticated(): boolean {
    return !!this.loggedUser;
  }

  public getUserInfo() {
    return this.isAuthenticated() ?
      this.loggedUser.userName : '';
  }

  public login_normal(userName: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const loginInfo = { userName, password };

    return this.http.post('/api/login/', JSON.stringify(loginInfo), options)
      .do((response: Response) => {
        if (response) {
          this.loggedUser = <LoggedUser> response.json().user;
        }
      });
  }

  public logout_normal() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    this.loggedUser = undefined;

    return this.http.post('/api/logout', JSON.stringify({}), options);
  }

  public checkAuthenticationStatus_normal() {
    // ToDo: this method should check authentication after page refresh
  }
}
