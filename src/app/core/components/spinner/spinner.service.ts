import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {
  private visibility = new BehaviorSubject(false);

  public get show(): Observable<boolean> {
    return this.visibility.asObservable();
  }

  public runLoading() {
    this.visibility.next(true);
  }

  public stopLoading() {
    this.visibility.next(false);
  }
}
