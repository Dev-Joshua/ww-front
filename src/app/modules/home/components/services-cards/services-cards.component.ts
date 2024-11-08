import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-cards.component.html',
  styleUrl: './services-cards.component.css',
})
export class ServicesCardsComponent {}
