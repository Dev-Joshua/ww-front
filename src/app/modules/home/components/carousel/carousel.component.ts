import { Component, inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent implements AfterViewInit {
  private router = inject(Router);
  ngAfterViewInit(): void {
    const items = document.querySelectorAll('[data-carousel-item]');
    if (items.length) {
      items[0]?.classList.remove('hidden');
    }
  }

  goToFilter() {
    this.router.navigate(['/app/filtro-prestadores']);
  }
}
