import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoDetailComponent } from './plato-detail.component';

describe('PlatoDetailComponent', () => {
  let component: PlatoDetailComponent;
  let fixture: ComponentFixture<PlatoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
