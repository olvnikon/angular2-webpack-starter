import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import template from './login.component.html';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  template,
  selector: 'login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public wrongCredentials: boolean = false;

  constructor(private authService: AuthService,
              private spinnerService: SpinnerService,
              private ref: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.authService
      .userInfoObservable
      .subscribe(loggedUser => {
        this.formGroup.enable();
        this.ref.markForCheck();
        this.spinnerService.stopLoading();
      });
  }

  public getErrorClass(control: FormControl): string {
    return control.dirty && !!control.errors ?
      'has-error' : '';
  }

  public login(form: FormGroup): void {
    this.spinnerService.runLoading();
    this.formGroup.disable();
    this.authService
      .login(form.controls.login.value, form.controls.password.value)
      .subscribe(state => {
        if (!state) {
          this.wrongCredentials = true;
        } else {
          this.router.navigate(['/courses']);
        }
      });
  }
}
