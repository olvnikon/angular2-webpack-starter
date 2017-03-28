import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import template from './login.component.html';

@Component({
  template,
  selector: 'login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public isFormDisabled: boolean = false;

  constructor(private authService: AuthService,
              private spinnerService: SpinnerService,
              private ref: ChangeDetectorRef
  ) {
  }

  public ngOnInit(): void {
    this.authService
      .userInfoObservable
      .subscribe(loggedUser => {
        this.isFormDisabled = false;
        this.ref.markForCheck();
        this.spinnerService.stopLoading();
      });
  }

  public login(e): void {
    e.preventDefault();
    this.spinnerService.runLoading();
    this.isFormDisabled = true;
    this.authService.login();
  }
}
