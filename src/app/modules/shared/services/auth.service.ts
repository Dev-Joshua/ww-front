import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResponseAccess } from '../models/response-access.model';
import { Login } from '../models/login.model';
import { environment } from '../../../../environments/environment';
import { TokenService } from './token.service';
import { Usuario } from '../models/usuario.model';
import { checkToken } from '../../custom/interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl: string = environment.API_URL;
  usuario$ = new BehaviorSubject<Usuario | null>(null);

  getDataUser() {
    return this.usuario$.getValue();
  }

  registrarse(object: Usuario): Observable<ResponseAccess> {
    return this.http
      .post<ResponseAccess>(`${this.apiUrl}/auth/register`, object)
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  login(object: Login): Observable<ResponseAccess> {
    return this.http
      .post<ResponseAccess>(`${this.apiUrl}/auth/login`, object)
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  getProfile() {
    // const token = this.tokenService.getToken();
    return this.http
      .get<Usuario>(`${this.apiUrl}/api/v1/wwdemo/perfil`, {
        context: checkToken(),
      })
      .pipe(
        tap((usuario) => {
          this.usuario$.next(usuario);
        })
      );
  }
}
