import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Backend extends Http {
  public request(url: Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options);
  }
}
