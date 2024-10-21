import { Component, Input } from '@angular/core';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { SolicitudService } from '../../../shared/services/solicitud.service';

@Component({
  selector: 'app-cambiar-estado',
  standalone: true,
  imports: [],
  template: ` <button (click)="cambiarEstado('ACEPTADO')">Aceptar</button>
    <button (click)="cambiarEstado('EN_CURSO')">Iniciar</button>
    <button (click)="cambiarEstado('FINALIZADO')">Finalizar</button>`,
  styles: '',
})
export class CambiarEstadoComponent {
  @Input() solicitud!: Solicitud; // Recibe la solicitud como input

  constructor(private solicitudService: SolicitudService) {}

  cambiarEstado(nuevoEstado: string) {
    this.solicitudService
      .cambiarEstado(this.solicitud.id, nuevoEstado)
      .subscribe(
        (solicitudActualizada) => {
          console.log('Estado cambiado:', solicitudActualizada);
          // Aquí puedes agregar lógica para actualizar la lista de solicitudes
        },
        (error) => {
          console.error('Error al cambiar el estado:', error);
        }
      );
  }
}
