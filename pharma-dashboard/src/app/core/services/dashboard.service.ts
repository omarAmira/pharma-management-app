import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StatJourDTO {
  date: string;
  nombrePatients: number;
}

export interface PatientArriveDTO {
  nom: string;
  prenom: string;
  dateRdv: string;
  statut: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private api = 'http://localhost:8087/api/dashboard';

  constructor(private http: HttpClient) {}

  getStatsParJour(): Observable<StatJourDTO[]> {
    return this.http.get<StatJourDTO[]>(`${this.api}/stats-par-jour`);
  }

  getPatientsByDate(date: string): Observable<PatientArriveDTO[]> {
    return this.http.get<PatientArriveDTO[]>(
      `${this.api}/patients-par-date?date=${date}`
    );
  }
}