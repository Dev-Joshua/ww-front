import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { Usuario } from '../../../shared/models/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';
import { RequestStatus } from '../../../shared/models/request-status.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HeaderComponent,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  public formRegister: FormGroup = this.formBuild.nonNullable.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    documento_identidad: ['', Validators.required],
    ciudad: ['', Validators.required],
    direccion: ['', Validators.required],
    celular: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
    rol: ['', Validators.required],
  });
  showPassword = false;
  status: RequestStatus = 'init';
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  registrarse() {
    if (this.formRegister.valid) {
      this.status = 'loading';
      const object: Usuario = {
        id_usuario: this.formRegister.value['id_usuario'],
        foto_usuario: this.formRegister.value['foto_usuario'],
        nombre: this.formRegister.value['nombre'],
        apellidos: this.formRegister.value['apellidos'],
        documento_identidad: this.formRegister.value['documento_identidad'],
        ciudad: this.formRegister.value['ciudad'],
        direccion: this.formRegister.value['direccion'],
        celular: this.formRegister.value['celular'],
        email: this.formRegister.value['email'],
        contrasena: this.formRegister.value['contrasena'],
        rol: this.formRegister.value['rol'],
      };

      this.authService.registrarse(object).subscribe({
        next: (data) => {
          this.status = 'success';
          if (data.token) {
            this.router.navigate(['/app/home']);
          }
        },
        error: () => {
          this.status = 'failed';
        },
      });
    }
  }

  login() {
    this.router.navigate(['login']);
  }
}
