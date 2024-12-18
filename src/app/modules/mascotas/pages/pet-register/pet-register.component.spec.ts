import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetRegisterComponent } from './pet-register.component';

describe('PetRegisterComponent', () => {
  let component: PetRegisterComponent;
  let fixture: ComponentFixture<PetRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
