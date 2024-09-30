import { Component, inject, signal } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { Usuario } from './../../../shared/models/usuario.model';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [UserComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  //Lista de usuarios
  usuarios = signal<Usuario[]>([]);
  usuario: Usuario | null = null;
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  public listaUsuarios: Usuario[] = [];

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.listaUsuarios = data;
        } else {
          console.error('La respuesta no contiene una lista de usuarios.');
        }
      },
      error: (error) => {
        console.log('Error al obtener usuarios:', error.message);
      },
    });
    this.authService.getProfile().subscribe((usuario) => {
      this.usuario = usuario;
    });
  }
}
