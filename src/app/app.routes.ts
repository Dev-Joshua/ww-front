import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './modules/auth/components/login-form/login-form.component';
import { LayoutComponent } from './modules/shared/components/layout/layout.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { ListComponent } from './modules/usuarios/pages/list/list.component';
import { RegisterFormComponent } from './modules/auth/components/register-form/register-form.component';
import { authGuard } from './modules/custom/auth.guard';
import { redirectGuard } from './modules/custom/redirect.guard';
import { UserProfileComponent } from './modules/usuarios/pages/user-info/user-info.component';
import { PetsTableComponent } from './modules/mascotas/components/pets-table/pets-table.component';
import { PetRegisterComponent } from './modules/mascotas/pages/pet-register/pet-register.component';
import { PetEditComponent } from './modules/mascotas/pages/pet-edit/pet-edit.component';

import { LayoutPetsComponent } from './modules/mascotas/pages/layout-pets/layout-pets.component';
import { FiltroPrestadoresComponent } from './modules/usuarios/pages/filtro-prestadores/filtro-prestadores.component';
import { SolicitarServicioComponent } from './modules/solicitudes/pages/solicitar-servicio/solicitar-servicio.component';
// import { SolicitudesPendientesComponent } from './modules/solicitudes/components/solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesUsuarioComponent } from './modules/solicitudes/pages/solicitudes-usuario/solicitudes-usuario.component';
import { SolicitudesPrestadorComponent } from './modules/solicitudes/pages/solicitudes-prestador/solicitudes-prestador.component';
import { SolicitudesComponent } from './modules/solicitudes/components/solicitudes/solicitudes.component';
import { CambiarEstadoComponent } from './modules/solicitudes/components/cambiar-estado/cambiar-estado.component';

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
      {
        path: 'mascotas/registro',
        component: PetRegisterComponent,
      },
      {
        path: 'mascotas/editar/:id',
        component: PetEditComponent,
      },
      {
        path: 'mascotas',
        component: LayoutPetsComponent,
      },
      {
        path: 'filtro-prestadores',
        component: FiltroPrestadoresComponent,
      },
      {
        path: 'solicitar-servicio/:prestadorId/:servicioId',
        component: SolicitarServicioComponent,
      },
      // {
      //   path: 'solicitudes-pendientes',
      //   component: SolicitudesPendientesComponent,
      // },
      {
        path: 'solicitudes-usuario',
        component: SolicitudesUsuarioComponent,
      },
      {
        path: 'solicitudes-prestador',
        component: SolicitudesPrestadorComponent,
      },
      { path: 'solicitudes', component: SolicitudesComponent },
      {
        path: 'cambiar-estado',
        component: CambiarEstadoComponent,
      },
    ],
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
