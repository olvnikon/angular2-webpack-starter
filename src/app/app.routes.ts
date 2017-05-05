import { Routes } from '@angular/router';
import {
  CourseListComponent,
  CourseDetailsComponent,
  LoginComponent,
  EditCourseComponent,
  NoContentComponent,
} from './pages';

export const ROUTES: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/new', component: EditCourseComponent },
  { path: 'courses/edit/:id', component: EditCourseComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NoContentComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
