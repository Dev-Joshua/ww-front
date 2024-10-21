import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../../../shared/models/usuario.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    FontAwesomeModule,
    FontAwesomeModule,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserProfileComponent implements OnInit {
  private router = inject(Router);
  userProfileForm: FormGroup;
  user: Usuario | null = null;
  faClose = faClose;

  public disabled = true;

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  constructor(private userService: UsuarioService, private fb: FormBuilder) {
    this.userProfileForm = this.fb.group({
      foto_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      documento_identidad: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      celular: ['', Validators.required],
      email: [{ value: '', disabled: true }, Validators.required],
      contrasena: ['', Validators.minLength(5)],
      rol: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
        console.log('User loaded:', this.user);
        this.userProfileForm.patchValue({
          id_usuario: data.id_usuario,
          foto_usuario: data.foto_usuario,
          nombre: data.nombre,
          apellidos: data.apellidos,
          documento_identidad: data.documento_identidad,
          ciudad: data.ciudad,
          direccion: data.direccion,
          celular: data.celular,
          email: data.email,
          contrasena: '',
          rol: data.rol,
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      },
    });
  }

  // Enviar el formulario de edición del perfil
  onSubmit(): void {
    if (this.userProfileForm.valid && this.user) {
      // Crear un nuevo objeto usaurio con los datos del formulario
      const updateUser: Usuario = {
        ...this.user,
        ...this.userProfileForm.value,
      };

      console.log('Datos enviados para actualización:', updateUser);
      console.log(
        'Valor de la contraseña:',
        this.userProfileForm.value.contrasena
      ); // Log para ver la contraseña
      console.log('¿Tiene contraseña?', 'contrasena' in updateUser); // Verifica si la contraseña se incluye

      // Si la contraseña está vacía, no la incluimos en la actualización
      if (!this.userProfileForm.value.contrasena) {
        updateUser.contrasena = this.user.contrasena;
        console.log(
          'La contraseña esta vaciam manteniendo la contraseña actual'
        );
      }

      this.userService.updateUserProfile(updateUser).subscribe({
        next: (response) => {
          console.log('Perfil actualizado con exito', response);
        },
        error: (err) => {
          console.error('Error al actualizar ', err);
        },
      });
    }
  }

  goToHome() {
    this.router.navigate(['/app/home']);
  }
}
