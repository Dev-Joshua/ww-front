import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { checkToken } from '../../custom/interceptors/token.interceptor';
import { Mascota } from '../models/mascota.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getPets(): Observable<Mascota[]> {
    const userId = this.tokenService.getUserIdFromToken();

    if (!userId) {
      console.error('No se pudo obtener el ID del usuario');
    }

    return this.http.get<Mascota[]>(
      `${this.apiUrl}/api/v1/wwdemo/usuarios/${userId}/mascotas`
    );
  }

  registerPet(userId: number, petData: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(
      `${this.apiUrl}/api/v1/wwdemo/usuarios/${userId}/mascotas`,
      petData
    );
  }

  //Obtener el perfil de mascota
  getPetProfile(petId: number): Observable<Mascota> {
    return this.http.get<Mascota>(
      `${this.apiUrl}/api/v1/wwdemo/mascotas/${petId}`
    );
  }

  // Actualizar mascota
  updatePetProfile(pet: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(
      `${this.apiUrl}/api/v1/wwdemo/mascotas/${pet.id_mascota}`,
      pet
    );
  }

  // Eliminar mascota
  deletePet(petId: number): Observable<void> {
    return this.http
      .delete<Mascota>(`${this.apiUrl}/api/v1/wwdemo/mascotas/${petId}`, {
        observe: 'response',
      })
      .pipe(
        map((response) => {
          if (response.status === 200 || response.status === 204) {
            return; // Retorna vacío ya que es un éxito.
          }
          throw new Error('Unexpected response status: ' + response.status);
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error al eliminar la mascota:', error);
          return throwError(error);
        })
      );
  }
}
