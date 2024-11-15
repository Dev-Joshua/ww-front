import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ResponseUser } from '../models/response-user.model';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { Usuario } from '../models/usuario.model';
import { checkToken } from '../../custom/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl: String = environment.API_URL;
  token = inject(TokenService).getToken();

  getUsuarios(): Observable<ResponseUser> {
    return this.http.get<ResponseUser>(
      `${this.apiUrl}/api/v1/wwdemo/usuarios`,
      { context: checkToken() }
    );
  }

  // Obtener el perfil del usuario
  getUserProfile(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/api/v1/wwdemo/perfil`);
  }

  // Actualizar el perfil del usuario
  updateUserProfile(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.apiUrl}/api/v1/wwdemo/usuarios/${user.id_usuario}`,
      user
    );
  }

  filtrarPrestadores(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios/prestadores/filtrar`, {
      params: { q: query },
    });
  }

  // Eliminar el perfil del usuario
  deleteUserAccount(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/api/v1/wwdemo/usuarios/${userId}`
    );
  }
}
