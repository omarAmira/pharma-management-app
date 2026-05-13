import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportPdfComponent } from './rapport-pdf.component';

describe('RapportPdfComponent', () => {
  let component: RapportPdfComponent;
  let fixture: ComponentFixture<RapportPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapportPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
