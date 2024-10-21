import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesUsuarioComponent } from './solicitudes-usuario.component';

describe('SolicitudesUsuarioComponent', () => {
  let component: SolicitudesUsuarioComponent;
  let fixture: ComponentFixture<SolicitudesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
