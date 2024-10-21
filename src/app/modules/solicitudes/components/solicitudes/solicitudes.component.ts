import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { SolicitudesPrestadorComponent } from '../../pages/solicitudes-prestador/solicitudes-prestador.component';
import { SolicitudesUsuarioComponent } from '../../pages/solicitudes-usuario/solicitudes-usuario.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [
    SolicitudesPrestadorComponent,
    SolicitudesUsuarioComponent,
    CommonModule,
  ],
  template: `<div *ngIf="userRole === 'CLIENTE'">
      <app-solicitudes-usuario />
    </div>
    <div
      *ngIf="
        userRole === 'PASEADOR' ||
        userRole === 'CUIDADOR' ||
        userRole === 'ENTRENADOR'
      "
    >
      <app-solicitudes-prestador />
    </div>`,
})
export class SolicitudesComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // Obtener el rol del usuario
  }
}
