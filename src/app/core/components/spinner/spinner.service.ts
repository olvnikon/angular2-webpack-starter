import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {
  private visibility = new BehaviorSubject(false);

  public get show(): Observable<boolean> {
    return this.visibility.asObservable();
  }

  public runLoading(): void {
    this.visibility.next(true);
  }

  public stopLoading(): void {
    this.visibility.next(false);
  }
}
