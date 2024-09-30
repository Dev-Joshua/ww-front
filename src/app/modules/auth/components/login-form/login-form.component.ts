import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';
import { Login } from '../../../shared/models/login.model';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '../../../shared/models/request-status.model';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HeaderComponent,
  ],
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  // public route = inject(ActivatedRoute);
  public formLogin: FormGroup = this.formBuild.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(5)]],
  });
  showPassword = false;
  status: RequestStatus = 'init';
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  iniciarSesion() {
    if (this.formLogin.valid) {
      this.status = 'loading';
      const object: Login = {
        email: this.formLogin.value['email'],
        contrasena: this.formLogin.value['contrasena'],
      };

      this.authService.login(object).subscribe({
        next: (data) => {
          this.status = 'success';
          if (data.token) {
            // localStorage.setItem('token', data.token);
            this.router.navigate(['/app/home']);
          }
        },
        error: () => {
          this.status = 'failed';
        },
      });
    }
  }

  registrarse() {
    this.router.navigate(['register']);
  }
}
