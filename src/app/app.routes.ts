import { Routes } from '@angular/router';
import {
  CourseListComponent,
  CourseDetailsComponent,
  LoginComponent,
  EditCourseComponent,
  NoContentComponent,
} from './pages';
import {
  CanActivateCourses,
  CanActivateLogin,
} from './core/route-guards';

export const ROUTES: Routes = [
  { path: 'courses', component: CourseListComponent, canActivate: [CanActivateCourses] },
  { path: 'courses/new', component: EditCourseComponent, canActivate: [CanActivateCourses] },
  { path: 'courses/edit/:id', component: EditCourseComponent, canActivate: [CanActivateCourses] },
  { path: 'courses/:id', component: CourseDetailsComponent, canActivate: [CanActivateCourses] },
  { path: 'login', component: LoginComponent, canActivate: [CanActivateLogin] },
  { path: '404', component: NoContentComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
