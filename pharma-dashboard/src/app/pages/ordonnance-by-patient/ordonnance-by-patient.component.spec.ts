import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceByPatientComponent } from './ordonnance-by-patient.component';

describe('OrdonnanceByPatientComponent', () => {
  let component: OrdonnanceByPatientComponent;
  let fixture: ComponentFixture<OrdonnanceByPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnanceByPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceByPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
