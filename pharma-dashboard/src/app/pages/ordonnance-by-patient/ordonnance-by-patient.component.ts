import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdonnanceService } from 'src/app/core/services/ordonnance.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/model/patient.model';

@Component({
  selector: 'app-ordonnance-by-patient',
  templateUrl: './ordonnance-by-patient.component.html',
  styleUrls: ['./ordonnance-by-patient.component.scss']
})
export class OrdonnanceByPatientComponent {
  patientId!: number;
  patient?: Patient;
  ordonnances: any[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private ordonnanceService: OrdonnanceService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.patientId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPatient();
    this.loadOrdonnances();
  }

  loadPatient(): void {
    this.patientService.getPatientById(this.patientId).subscribe({
      next: (data) => {
        this.patient = data;
      },
      error: () => {
        alert('Erreur lors du chargement du patient');
      }
    });
  }

  loadOrdonnances(): void {
    this.loading = true;
    this.ordonnanceService.getOrdonnancesByPatient(this.patientId).subscribe({
      next: (data) => {
        this.ordonnances = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Erreur lors du chargement des ordonnances');
      }
    });
  }

  goToSessions(ordonnanceId: number): void {
    this.router.navigate(['/sessions', ordonnanceId]);
  }
}
