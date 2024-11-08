import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComoConectarComponent } from './como-conectar.component';

describe('ComoConectarComponent', () => {
  let component: ComoConectarComponent;
  let fixture: ComponentFixture<ComoConectarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComoConectarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComoConectarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
