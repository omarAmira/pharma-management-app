// src/app/pages/patients/patients.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, map, startWith } from 'rxjs';
import { OrdonnanceService } from 'src/app/core/services/ordonnance.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { Patient } from 'src/app/model/patient.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {

  searchCtrl = new FormControl('');
  statutCtrl = new FormControl('');
  pathoCtrl  = new FormControl('');

  patients: any[] = [];
  selectedPatient: any | null = null;
  ordonnances: any[] = [];
  constructor(private patientService: PatientService,  private ordonnanceService: OrdonnanceService,
private router: Router) {}

  ngOnInit(): void {
    this.patientService.getPatients().subscribe(rawPatients => {
      const mapped = rawPatients.map(p => {
        const initiales = (p.nom?.charAt(0) ?? '') + (p.prenom?.charAt(0) ?? '');
        const age = this.calcAge(p.dateNaissance);
        return {
          ...p,
          initiales,
          age,
          statut: 'actif',       // valeur par défaut pour garder le design
          gradient: 'g1',        // valeur par défaut pour l’avatar
          derniereVisite: p.dateNaissance // affichée comme "dernière visite"
        };
      });

      combineLatest([
        this.searchCtrl.valueChanges.pipe(startWith('')),
        this.statutCtrl.valueChanges.pipe(startWith('')),
        this.pathoCtrl.valueChanges.pipe(startWith('')),
      ]).pipe(
        map(([search, statut, patho]) => {
          const s = (search ?? '').toLowerCase();
          return mapped.filter(pt => {
            const matchSearch = !s || pt.nom.toLowerCase().includes(s) || pt.prenom.toLowerCase().includes(s) || pt.numeroDossier.toLowerCase().includes(s);
            const matchStatut = !statut || pt.statut === statut;
            return matchSearch && matchStatut;
          });
        }),
      ).subscribe(r => this.patients = r);
    });
  }
createOrdonnance(patientId: number): void {
  // Redirige vers le composant ordonnance avec l'id du patient
  this.router.navigate(['/ordonnances/create', patientId]);
}
  calcAge(dateNaissance: string): number {
    const birth = new Date(dateNaissance);
    const diff = Date.now() - birth.getTime();
    const ageDt = new Date(diff);
    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }

  openPatient(p: any): void {
  this.selectedPatient = p;

  this.ordonnanceService.getOrdonnancesByPatient(p.id)
    .subscribe(res => {
      this.ordonnances = res;
    });
}
openOrdonnance(o: any): void {
  this.router.navigate(['/sessions', o.id]);
}
  closeDetail(): void { this.selectedPatient = null; }

  badgeClass(statut: string): string { return statut === 'actif' ? 'b-ok' : 'b-gray'; }
  badgeLabel(statut: string): string { return statut === 'actif' ? '● Actif' : '○ Terminé'; }


  openAddForm = false;
newPatient: Patient = {
  nom: '',
  prenom: '',
  dateNaissance: '',
  numeroDossier: '',
  numeroTlf: '',
  
};

addPatient(): void {
  this.patientService.addPatient(this.newPatient).subscribe(p => {
    this.patients.push({
      ...p,
      initiales: (p.nom.charAt(0) + p.prenom.charAt(0)),
      age: this.calcAge(p.dateNaissance),
      statut: 'actif',
      gradient: 'g1',
      derniereVisite: p.dateNaissance
    });
    this.openAddForm = false;
    this.newPatient = { nom: '', prenom: '', dateNaissance: '', numeroDossier: '', numeroTlf: '' };
  });
}



downloadPatientCard(patient: any, format: 'pdf' | 'png' = 'pdf'): void {
  const element = document.getElementById('patient-card-' + patient.id);
  if (!element) return;

  html2canvas(element, { scale: 2 }).then(canvas => {
    if (format === 'png') {
      const link = document.createElement('a');
      link.download = `carte-${patient.nom}-${patient.prenom}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      const imgData = canvas.toDataURL('image/png');
      // Format ID-1 (carte bancaire) : 85.60 x 53.98 mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [85.60, 53.98]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 85.60, 53.98);
      pdf.save(`carte-${patient.nom}-${patient.prenom}.pdf`);
    }
  });
}

getExpirationDate(createdAt?: string): string {
  const date = createdAt ? new Date(createdAt) : new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date.toLocaleDateString('fr-FR'); // format français JJ/MM/AAAA


}
}
