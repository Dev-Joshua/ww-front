import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPetsComponent } from './layout-pets.component';

describe('LayoutPetsComponent', () => {
  let component: LayoutPetsComponent;
  let fixture: ComponentFixture<LayoutPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
