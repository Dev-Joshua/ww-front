import { Routes } from '@angular/router';

import { LoginFormComponent } from './modules/auth/components/login-form/login-form.component';
import { HeaderComponent } from './modules/shared/components/header/header.component';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { RegisterFormComponent } from './modules/auth/components/register-form/register-form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
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
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
