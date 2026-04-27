import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/model/patient.model';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:8087/patients'; // URL backend

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

   scanPatient(code: string) {
    return this.http.get<any>(`${this.apiUrl}/scan?code=${code}`);
  }
  getPatientById(id: number): Observable<Patient> {
  return this.http.get<Patient>(`${this.apiUrl}/${id}`);
}


}
