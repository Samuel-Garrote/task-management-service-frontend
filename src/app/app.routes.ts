import { Routes } from '@angular/router';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { NewProjectFormComponent } from './components/new-project-form/new-project-form.component';
import { NewTaskFormComponent } from './components/new-task-form/new-task-form.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },

  { path: 'projects', component: ProjectListComponent, canActivate: [authGuard] },
  { path: 'new-project', component: NewProjectFormComponent, canActivate: [authGuard] },
  { path: 'projects/:projectId/tasks', component: TaskListComponent, canActivate: [authGuard] },
  { path: 'new-task', component: NewTaskFormComponent, canActivate: [authGuard] },

  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: '**', redirectTo: 'projects' },
];
