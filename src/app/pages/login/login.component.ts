import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services';
import { SpinnerService } from '../../core/components/spinner';
import template from './login.component.html';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoggedUser } from '../../core/entities';
import { Observable } from 'rxjs/Observable';

@Component({
  template,
  selector: 'login',
  styles: [require('./login.component.scss')],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public wrongCredentials: boolean = false;
  private loggedUser: Observable<LoggedUser>;

  constructor(private authService: AuthService,
              private spinnerService: SpinnerService,
              private ref: ChangeDetectorRef,
              private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<LoggedUser>) {
    this.loggedUser = this.store.select<LoggedUser>('loggedUser');
  }

  public ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loggedUser.subscribe(() => {
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
