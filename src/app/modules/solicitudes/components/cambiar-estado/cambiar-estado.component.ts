import { Component, Input } from '@angular/core';
import { Solicitud } from '../../../shared/models/solicitud.model';
import { SolicitudService } from '../../../shared/services/solicitud.service';

@Component({
  selector: 'app-cambiar-estado',
  standalone: true,
  imports: [],
  template: ` <div class="flex justify-center">
    <button class="custom-button" (click)="cambiarEstado('ACEPTADO')">
      Aceptar
    </button>
    <button class="custom-button" (click)="cambiarEstado('EN_CURSO')">
      Iniciar
    </button>
    <button class="custom-button" (click)="cambiarEstado('FINALIZADO')">
      Finalizar
    </button>
  </div>`,
  styles: [
    `
      .custom-button {
        width: 30%;
        margin: 0 10px;
        padding: 5px;
        font-weight: 500;
        font-size: 12px;
        cursor: pointer;
        background-color: #007f7f;
        border: none;
        color: #fff;
        border-radius: 8px;
      }
      .custom-button:hover {
        opacity: 0.6;
        transition: all 0.4s;
      }
    `,
  ],
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
