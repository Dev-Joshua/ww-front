import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConoceMasComponent } from './conoce-mas.component';

describe('ConoceMasComponent', () => {
  let component: ConoceMasComponent;
  let fixture: ComponentFixture<ConoceMasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConoceMasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConoceMasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
