// src/app/core/services/session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DistributionDTO {
  medicamentStockId: number;
  quantite: number;
}

export interface SessionDTO {
   ordonnanceId: number;
  joursDistribution: number;
  dateProchainRdv: string;
  distributions: DistributionDTO[];
}

@Injectable({ providedIn: 'root' })
export class SessionService {
  private apiUrl = 'http://localhost:8087/api/sessions';

  constructor(private http: HttpClient) {}

  creerPremiereSession(ordonnanceId: number, jours: number): Observable<SessionDTO> {
    return this.http.post<SessionDTO>(`${this.apiUrl}/creer/${ordonnanceId}?joursDistribution=${jours}`, {});
  }

traiterArrivee(ordonnanceId: number): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(`${this.apiUrl}/arrivee/${ordonnanceId}`, {});
}


  getSessions(ordonnanceId: number): Observable<SessionDTO[]> {
    return this.http.get<SessionDTO[]>(`${this.apiUrl}/ordonnance/${ordonnanceId}`);
  }

  creerSessionManuelle(request: SessionDTO): Observable<SessionDTO> {
  return this.http.post<SessionDTO>(`${this.apiUrl}/manuel`, request);
}
}
