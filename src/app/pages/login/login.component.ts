import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import template from './login.component.html';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template,
  selector: 'login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public isFormDisabled: boolean = false;
  public formGroup: FormGroup;

  constructor(private authService: AuthService,
              private spinnerService: SpinnerService,
              private ref: ChangeDetectorRef,
              private formBuilder: FormBuilder
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

    this.formGroup = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public login(e): void {
    e.preventDefault();
    this.spinnerService.runLoading();
    this.isFormDisabled = true;
    this.authService
      .login('nikon', '12345')
      .subscribe();
  }
}
