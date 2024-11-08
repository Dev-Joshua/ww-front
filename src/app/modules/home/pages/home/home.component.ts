import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicesCardsComponent } from '../../components/services-cards/services-cards.component';
import { ConoceMasComponent } from '../../components/conoce-mas/conoce-mas.component';
import { ComoConectarComponent } from '../../components/como-conectar/como-conectar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CarouselComponent,
    ServicesCardsComponent,
    ConoceMasComponent,
    ComoConectarComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
