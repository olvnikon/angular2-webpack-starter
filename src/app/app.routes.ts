import { Routes } from '@angular/router';
import { CourseListComponent } from './pages/course-list';
import { CourseDetailsComponent } from './pages/course-details';
import { LoginComponent } from './pages/login';

export const ROUTES: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'login', component: LoginComponent },
];
