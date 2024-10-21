import { Component, inject, OnInit } from '@angular/core';
import { Mascota } from '../../../shared/models/mascota.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MascotaService } from '../../../shared/services/mascota.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';

@Component({
  selector: 'app-pet-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FontAwesomeModule,
  ],
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.css',
})
export class PetEditComponent implements OnInit {
  petProfileForm: FormGroup;
  pet: Mascota | null = null;
  petId: number | null = null;

  public disabled = true;

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  constructor(
    private petService: MascotaService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.petProfileForm = this.fb.group({
      tipo_mascota: ['', Validators.required],
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      raza: ['', Validators.required],
      peso: [''],
      tamano: ['', Validators.required],
      sexo: ['', Validators.required],
      esterilizado: ['', Validators.required],
      foto_mascota: [''],
      descripcion_mascota: ['', Validators.required],
      info_cuidado: [''],
    });
  }

  ngOnInit(): void {
    console.log('PetEditComponent initialized');
    this.route.paramMap.subscribe((params) => {
      this.petId = Number(params.get('id'));
      console.log(`ID de la mascota obtenido de la ruta: ${this.petId}`);
      if (this.petId) {
        this.loadPetProfile(this.petId); // Carga los datos de la mascota con el ID
      } else {
        console.error('No se proporcionó un ID de mascota válido.');
      }
    });
  }

  loadPetProfile(petId: number): void {
    this.petService.getPetProfile(petId).subscribe({
      next: (data) => {
        this.pet = data;
        console.log('Pet loaded:', this.pet);
        this.petProfileForm.patchValue({
          id_mascota: data.id_mascota,
          tipo_mascota: data.tipo_mascota,
          nombre: data.nombre,
          edad: data.edad,
          raza: data.raza,
          peso: data.peso,
          tamano: data.tamano,
          sexo: data.sexo,
          esterilizado: data.esterilizado,
          descripcion_mascota: data.descripcion_mascota,
          info_cuidado: data.info_cuidado,
          foto_mascota: data.foto_mascota,
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      },
    });
  }

  // Enviar el formulario de edición del perfil
  onSubmit(): void {
    if (this.petProfileForm.valid && this.pet) {
      // Crear un nuevo objeto usaurio con los datos del formulario
      const updatePet: Mascota = {
        ...this.pet,
        ...this.petProfileForm.value,
      };

      console.log('Datos enviados para actualización:', updatePet);

      this.petService.updatePetProfile(updatePet).subscribe({
        next: (response) => {
          console.log('Perfil actualizado con exito', response);
        },
        error: (err) => {
          console.error('Error al actualizar ', err);
        },
      });
    }
  }
}
