import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { GenericDataSource } from './data-source';

import { MascotaService } from '../../../shared/services/mascota.service';
import { Mascota } from '../../../shared/models/mascota.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pets-table',
  standalone: true,
  imports: [CdkTableModule, CommonModule, RouterModule],
  templateUrl: './pets-table.component.html',
  styleUrl: './pets-table.component.css',
})
export class PetsTableComponent implements OnInit {
  private mascotaService = inject(MascotaService);
  dataSource = new GenericDataSource<Mascota>();
  router = inject(Router);

  mascota: Mascota | null = null;

  columns: String[] = [
    'id_mascota',
    'foto_mascota',
    'tipo_mascota',
    'nombre',
    'edad',
    'raza',
    'sexo',
    'actions',
  ];

  ngOnInit(): void {
    this.mascotaService.getPets().subscribe((pets) => {
      this.dataSource.init(pets);
    });
  }

  editMascota(id: number) {
    // Redirige a la página de edición
    console.log(`Intentando editar la mascota con ID: ${id}`);
    console.log(`Navegando a /mascotas/editar/${id}`);
    this.router.navigate(['/app/mascotas/editar', id]).then((success) => {
      if (!success) {
        console.error(`No se pudo navegar a la ruta /mascotas/editar/${id}`);
      }
    });
  }

  confirmDelete(id: number) {
    const confirmation = confirm(
      '¿Estás seguro de que deseas eliminar esta mascota?'
    );
    if (confirmation) {
      this.deleteMascota(id);
    }
  }

  deleteMascota(id: number) {
    // Implementa aquí la lógica para eliminar la mascota
    console.log(`Eliminando mascota con ID: ${id}`);
    // Aquí puedes hacer la llamada a tu servicio para eliminar la mascota
  }
}
