import { Injectable } from '@angular/core';
import { LoggedUser } from '../entities';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  public loggedUser: LoggedUser;

  constructor(private http: Http) {

  }

  public login(userName: string, password: string) {
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

  public logout() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    this.loggedUser = undefined;

    return this.http.post('/api/logout', JSON.stringify({}), options);
  }

  public checkAuthenticationStatus() {
    // ToDo: this method should check authentication after page refresh
  }

  public isAuthenticated(): boolean {
    return !!this.loggedUser;
  }
}
