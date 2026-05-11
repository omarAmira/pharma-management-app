import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrdonnanceService {
  private apiUrl = 'http://localhost:8087/api/ordonnances';

  constructor(private http: HttpClient) {}

  createOrdonnance(dto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dto);
  }

    getOrdonnance(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // ⭐ NOUVEAU : GET ordonnances by patient
  getOrdonnancesByPatient(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patient/${patientId}`);
  }

  // ⭐ NOUVEAU : Mise à jour
  updateOrdonnance(id: number, dto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, dto);
  }

getAllOrdonnances(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}
}
