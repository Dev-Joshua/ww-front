import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SolicitudService } from '../../../shared/services/solicitud.service';
import { GenericDataSource } from './data-source';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { CambiarEstadoComponent } from '../../components/cambiar-estado/cambiar-estado.component';

@Component({
  selector: 'app-solicitudes-prestador',
  standalone: true,
  imports: [CdkTableModule, CommonModule, RouterModule, CambiarEstadoComponent],
  templateUrl: './solicitudes-prestador.component.html',
  styleUrl: './solicitudes-prestador.component.css',
})
export class SolicitudesPrestadorComponent {
  private requestService = inject(SolicitudService);
  dataSource = new GenericDataSource<Solicitud>();
  solicitudes: Solicitud[] = [];
  columns: String[] = [
    'id_solicitud',
    'fecha_solicitud',
    'servicio',
    'mascota',
    'estado',
    'usuario',
    'acciones',
  ];

  ngOnInit(): void {
    this.requestService.getSolicitudesPrestador().subscribe((data) => {
      console.log('Solicitudes del prestador:', data);
      this.solicitudes = data;
      this.dataSource.init(this.solicitudes);
    });
  }

  hasSolicitudes(): boolean {
    return this.solicitudes.length > 0;
  }
}
