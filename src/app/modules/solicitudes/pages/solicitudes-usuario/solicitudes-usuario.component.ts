import { Component, inject } from '@angular/core';
import { SolicitudService } from '../../../shared/services/solicitud.service';
import { GenericDataSource } from './data-source';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { Router, RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitudes-usuario',
  standalone: true,
  imports: [CdkTableModule, CommonModule, RouterModule],
  templateUrl: './solicitudes-usuario.component.html',
  styleUrl: './solicitudes-usuario.component.css',
})
export class SolicitudesUsuarioComponent {
  private requestService = inject(SolicitudService);
  dataSource = new GenericDataSource<Solicitud>();
  router = inject(Router);
  solicitudes: Solicitud[] = []; // Cambiamos esto para almacenar las solicitudes
  // solicitud: Solicitud | null = null;

  columns: String[] = [
    'id_solicitud',
    'fecha_solicitud',
    'servicio',
    'mascota',
    'estado',
    'usuario',
    'prestador',
  ];

  ngOnInit(): void {
    this.requestService.getSolicitudesUsuario().subscribe((data) => {
      console.log('Solicitudes del usuario:', data); // Log de las solicitudes
      this.solicitudes = data;
      this.dataSource.init(this.solicitudes);
    });
  }

  hasSolicitudes(): boolean {
    return this.solicitudes.length > 0; // Verificamos si hay solicitudes
  }
}
