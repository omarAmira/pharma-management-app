// src/app/core/services/session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DistributionDTO {
  medicamentStockId?: number;   // utilisé pour création
  nomMedicament?: string;       // utilisé pour affichage
  quantite?: number;            // utilisé pour création
  quantiteDonnee?: number;      // utilisé pour affichage
}

export interface SessionDTO {
  id?: number;                  // 🔥 optionnel : backend le génère
  ordonnanceId: number;
  dateSession?: string;         // affichage
  joursDistribution: number;
  dateProchainRdv: string;
  statut?: string;              // affichage
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

annulerSession(sessionId: number): Observable<{ message: string }> {
  return this.http.delete<{ message: string }>(`${this.apiUrl}/${sessionId}/annuler`);
}

}
