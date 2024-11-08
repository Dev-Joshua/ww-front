import { Component, inject, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
// import { NotificacionService } from '../../services/notificacion.service';
import { Notificacion } from '../../models/notificacion.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    OverlayModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  // private notificacionService = inject(NotificacionService);

  constructor() {
    this.updateNavDisplay();
    this.showMenuDisplay();
  }

  // Método para actualizar la visualización del menú según el ancho de pantalla
  updateNavDisplay() {
    this.activeMenu = this.screenWidth > 640;
  }

  showMenuDisplay() {
    this.listMenu = this.screenWidth > 640;
  }

  listMenu = false;
  activeMenu = false;
  screenWidth: number = window.innerWidth;
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;
  searchQuery: string = '';

  isOpen = false;
  mostrarNotificaciones = false;
  notificaciones: Notificacion[] = [];

  usuario$ = this.authService.usuario$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/app/perfil']);
  }

  goToMascotas() {
    this.router.navigate(['/app/mascotas']);
  }

  goToSolicitudes() {
    this.router.navigate(['/app/solicitudes']);
  }

  // Listener para detectar cambios en el tamaño de la pantalla
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
    this.updateNavDisplay();
  }
}
