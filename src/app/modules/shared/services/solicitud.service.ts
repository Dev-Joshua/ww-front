import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getSolicitudesUsuario(): Observable<Solicitud[]> {
    const userId = this.tokenService.getUserIdFromToken();

    if (!userId) {
      console.error('No se pudo obtener el ID del usuario');
      return of([]);
    }

    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/api/v1/wwdemo/solicitudes/usuario/${userId}`
    );
  }

  createSolicitud(data: any): Observable<any> {
    const userId = this.tokenService.getUserIdFromToken();
    return this.http.post(
      `${this.apiUrl}/api/v1/wwdemo/solicitudes/${userId}`,
      data
    );
  }

  getMascotasUsuario(): Observable<any> {
    const userId = this.tokenService.getUserIdFromToken();
    return this.http.get(
      `${this.apiUrl}/api/v1/wwdemo/usuarios/${userId}/mascotas`
    );
  }

  // Solicitudes para el prestador
  getSolicitudesPrestador(): Observable<Solicitud[]> {
    const userId = this.tokenService.getUserIdFromToken();
    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/api/v1/wwdemo/solicitudes/prestador/${userId}`
    );
  }

  cambiarEstado(id: number, nuevoEstado: string): Observable<Solicitud> {
    return this.http.put<Solicitud>(
      `${this.apiUrl}/api/v1/wwdemo/solicitudes/${id}/estado`,
      nuevoEstado,
      { headers: { 'Content-Type': 'text/plain' } }
    );
  }

  // Cambiar el estado de una solicitud
  // cambiarEstadoSolicitud(
  //   solicitudId: number,
  //   nuevoEstado: string
  // ): Observable<any> {
  //   return this.http.patch(
  //     `${this.apiUrl}/api/v1/wwdemo/solicitudes/${solicitudId}/estado`,
  //     null,
  //     {
  //       params: { estado: nuevoEstado },
  //     }
  //   );
  // }
}
