import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesPrestadorComponent } from './solicitudes-prestador.component';

describe('SolicitudesPrestadorComponent', () => {
  let component: SolicitudesPrestadorComponent;
  let fixture: ComponentFixture<SolicitudesPrestadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesPrestadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
