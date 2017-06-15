import { Routes } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';
import { CoursesComponent } from 'app/courses/courses.component';
import { AddEditCourse } from 'app/add-edit-course/add-edit-course.component';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login',  component: LoginComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/edit/:id', component: AddEditCourse },
  { path: 'courses/new', component: AddEditCourse },
];
