import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateCourses implements CanActivate {
  public constructor(private authService: AuthService) {

  }

  public canActivate(): boolean {
    return !!this.authService.userInfo.getValue();
  }
}
