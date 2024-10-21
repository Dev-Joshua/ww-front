import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro-prestadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-prestadores.component.html',
  styleUrl: './filtro-prestadores.component.css',
})
export class FiltroPrestadoresComponent {
  ciudad: string = '';
  servicioId: number | null = null;
  nombre: string = '';
  servicios: any[] = [];
  prestadores: any[] = [];

  public disabled = true;

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  constructor(
    private http: HttpClient,
    private userService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener la lista de servicios para el dropdown
    this.http
      .get<any[]>('http://localhost:8080/api/v1/wwdemo/servicios')
      .subscribe((data) => {
        this.servicios = data;
      });
  }

  buscarPrestadores(): void {
    const params: any = {};
    if (this.ciudad) params.ciudad = this.ciudad;
    if (this.servicioId) {
      params.servicioId = this.servicioId;
    } else {
      this.servicioId = null;
    }
    if (this.nombre) params.nombre = this.nombre;

    this.http
      .get<any[]>('http://localhost:8080/api/v1/wwdemo/usuarios/filtrar', {
        params,
      })
      .subscribe((data) => {
        this.prestadores = data;
        console.log('Usuarios recibidos del backend:', this.prestadores); // Log para ver los datos recibidos
      });
  }

  solicitarServicio(prestadorId: number, servicioId: number | null): void {
    if (!prestadorId || !servicioId) {
      console.error('prestadorId o servicioId es nulo. No se puede navegar.');
      return; // Detenemos la navegación si faltan datos
    }

    this.router.navigate([`/app/solicitar-servicio`, prestadorId, servicioId]);
  }
}
