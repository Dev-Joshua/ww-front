import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MascotaService } from '../../../shared/services/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../shared/services/token.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pet-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FontAwesomeModule,
  ],
  templateUrl: './pet-register.component.html',
  styleUrl: './pet-register.component.css',
})
export class PetRegisterComponent implements OnInit {
  private mascotaService = inject(MascotaService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private tokenService = inject(TokenService);
  public petRegisterForm: FormGroup = this.formBuild.nonNullable.group({
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
  faClose = faClose;
  isOpen = false;
  showModal = false;

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.petRegisterForm.valid) {
      const newPet = this.petRegisterForm.value;

      // Obtener el ID del usuario logueado
      const userId = this.tokenService.getUserIdFromToken();

      // Verificar que se obtenga el ID del usuario
      if (!userId) {
        console.error('No se pudo obtener el ID del usuario');
        return;
      }

      // Llamar al método registerPet del servicio de mascotas
      this.mascotaService.registerPet(userId, newPet).subscribe({
        next: (response) => {
          console.log('Mascota registrada con éxito:', response);
          this.showModal = true;
        },
        error: (err) => {
          console.error('Error al registrar la mascota', err);
        },
      });
    } else {
      console.error('El formulario es inválido');
    }
  }

  goToHome() {
    this.router.navigate(['/app/mascotas']);
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/app/mascotas']);
  }
}
