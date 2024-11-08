import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudService } from '../../../shared/services/solicitud.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solicitar-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitar-servicio.component.html',
  styleUrl: './solicitar-servicio.component.css',
})
export class SolicitarServicioComponent implements OnInit {
  solicitudForm: FormGroup;
  prestadorId: number | null = null;
  servicioId: number | null = null;
  mascotas: any[] = [];

  constructor(
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.solicitudForm = this.fb.group({
      fecha_solicitud: ['', Validators.required],
      mascota_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.prestadorId = params['prestadorId'];
      this.servicioId = params['servicioId'];
      // Aquí debes cargar las mascotas del usuario para que las pueda seleccionar
      this.loadMascotas();
    });
  }

  loadMascotas() {
    // Llamada al servicio para cargar las mascotas del usuario
    // Suponiendo que tienes un servicio para obtener las mascotas
    this.solicitudService.getMascotasUsuario().subscribe((data) => {
      this.mascotas = data;
    });
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      const formData = {
        prestador_id: Number(this.prestadorId),
        servicio_id: Number(this.servicioId),
        fecha_solicitud: this.solicitudForm.get('fecha_solicitud')?.value,
        mascota_id: Number(this.solicitudForm.get('mascota_id')?.value),
      };

      this.solicitudService.createSolicitud(formData).subscribe((response) => {
        console.log('Solicitud creada:', response);
        // this.router.navigate(['/mis-solicitudes']); // Redirigir a otra página después de crear la solicitud
      });
    }
  }

  goToPrestadores() {
    this.router.navigate(['/app/filtro-prestadores']);
  }
}
