import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({ required: true }) usuario!: Usuario;

  @Output() requestUserService = new EventEmitter();

  addToRequestHandler() {
    console.log('click from child');
    this.requestUserService.emit(
      'Mensaje desde el hijo' + ' ' + this.usuario.nombre
    );
  }
  public disabled = true;

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }
}