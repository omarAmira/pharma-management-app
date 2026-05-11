import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnanceListeComponent } from './ordonnance-liste.component';

describe('OrdonnanceListeComponent', () => {
  let component: OrdonnanceListeComponent;
  let fixture: ComponentFixture<OrdonnanceListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdonnanceListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdonnanceListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
