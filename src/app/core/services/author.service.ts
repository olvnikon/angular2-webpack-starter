import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, RequestOptions, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { Author } from '../entities';

@Injectable()
export class AuthorService {
  private authors: BehaviorSubject<Author[]> = new BehaviorSubject([]);
  private url: string = 'http://localhost:2403/authors';

  constructor(private http: Http) {

  }

  public get authorsObservable() {
    return this.authors.asObservable();
  }

  public loadAll() {
    this.http.request(this.requestOptions)
      .map((response: Response): Author[] => this.convertToJson(response))
      .subscribe(authors => this.authors.next(authors));
  }

  private get requestOptions() {
    const requestOptions = new RequestOptions();
    requestOptions.url = this.url;
    requestOptions.method = RequestMethod.Get;
    return new Request(requestOptions);
  }

  private convertToJson(response: Response) {
    return response.status === 200 ? response.json() : [];
  }
}
