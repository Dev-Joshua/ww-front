import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroPrestadoresComponent } from './filtro-prestadores.component';

describe('FiltroPrestadoresComponent', () => {
  let component: FiltroPrestadoresComponent;
  let fixture: ComponentFixture<FiltroPrestadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroPrestadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroPrestadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
