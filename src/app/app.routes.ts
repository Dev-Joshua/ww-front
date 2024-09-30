import { Routes } from '@angular/router';

import { LoginFormComponent } from './modules/auth/components/login-form/login-form.component';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { ListComponent } from './modules/usuarios/pages/list/list.component';
import { RegisterFormComponent } from './modules/auth/components/register-form/register-form.component';
import { authGuard } from './modules/custom/auth.guard';
import { redirectGuard } from './modules/custom/redirect.guard';
import { UserProfileComponent } from './modules/usuarios/pages/user-info/user-info.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [redirectGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      },
    ],
  },
  {
    path: 'app',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },

      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'perfil',
        component: UserProfileComponent,
      },
    ],
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
