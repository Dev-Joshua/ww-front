import { Component, inject } from '@angular/core';
import { PetsTableComponent } from '../../components/pets-table/pets-table.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-layout-pets',
  standalone: true,
  imports: [PetsTableComponent, CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './layout-pets.component.html',
  styleUrl: './layout-pets.component.css',
})
export class LayoutPetsComponent {
  faClose = faClose;
  router = inject(Router);

  goToHome() {
    this.router.navigate(['/app/home']);
  }

  registerPet() {
    this.router.navigate(['/app/mascotas/registro']);
  }
}
