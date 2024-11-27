import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicioService } from '../../../shared/services/servicio.service';
import { Servicio } from '../../../shared/models/servicio.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-cards',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './services-cards.component.html',
  styleUrl: './services-cards.component.css',
})
export class ServicesCardsComponent {
  service1: Servicio | null = null;
  service2: Servicio | null = null;
  service3: Servicio | null = null;

  constructor(private servicesService: ServicioService) {}

  ngOnInit(): void {
    // Reemplaza los IDs con los que necesites
    this.fetchService(1, 'service1');
    this.fetchService(2, 'service2');
    this.fetchService(3, 'service3');
  }

  fetchService(
    serviceId: number,
    target: 'service1' | 'service2' | 'service3'
  ): void {
    this.servicesService.getServiceId(serviceId).subscribe(
      (data) => {
        this[target] = data; // Asigna el servicio a la variable correspondiente
      },
      (error) => {
        console.error(
          `Error al obtener el servicio con ID ${serviceId}`,
          error
        );
      }
    );
  }
}
