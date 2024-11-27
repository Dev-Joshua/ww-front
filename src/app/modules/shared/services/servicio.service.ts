import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getServices(): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.apiUrl}/api/v1/wwdemo/servicios`);
  }

  //Obtener servicio por id
  getServiceId(serviceId: number): Observable<Servicio> {
    return this.http.get<Servicio>(
      `${this.apiUrl}/api/v1/wwdemo/servicios/${serviceId}`
    );
  }
}
