// src/app/core/services/stock.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MedicamentStock {
  id?: number;
  nom: string;
  quantiteStock: number;
  seuil: number;
  unite?: string;          // SIROP, COMPRIME, UI, PILULATION, GOUTTES
  datePeremption?: string; // format ISO (yyyy-MM-dd)
}

@Injectable({ providedIn: 'root' })
export class StockService {
  private apiUrl = 'http://localhost:8087/medicaments-stock';

  constructor(private http: HttpClient) {}

  getMedicaments(): Observable<MedicamentStock[]> {
    return this.http.get<MedicamentStock[]>(this.apiUrl);
  }

  addMedicament(m: MedicamentStock): Observable<MedicamentStock> {
    return this.http.post<MedicamentStock>(this.apiUrl, m);
  }
}
