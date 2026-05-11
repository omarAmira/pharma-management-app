import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockHistoriqueComponent } from './stock-historique.component';

describe('StockHistoriqueComponent', () => {
  let component: StockHistoriqueComponent;
  let fixture: ComponentFixture<StockHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
