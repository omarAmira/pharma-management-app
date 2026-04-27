import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannerModalsComponent } from './scanner-modals.component';

describe('ScannerModalsComponent', () => {
  let component: ScannerModalsComponent;
  let fixture: ComponentFixture<ScannerModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannerModalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScannerModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
