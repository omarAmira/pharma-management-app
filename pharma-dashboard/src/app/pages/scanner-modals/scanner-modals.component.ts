import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner-modal',
  templateUrl: './scanner-modals.component.html',
  styleUrls: ['./scanner-modals.component.scss']
})
export class ScannerModalComponent implements OnInit {

  private buffer: string = '';
  private timer: any;
  loading = true;

  constructor(
    private patientService: PatientService,
    public dialogRef: MatDialogRef<ScannerModalComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const input = document.getElementById('scanInput') as HTMLInputElement;
      if (input) input.focus();
    }, 200);
  }

  onScan(event: any): void {
    this.buffer = event.target.value;

    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      const code = this.buffer.trim();
      if (!code) return;

      this.loading = true; // ✅ active l’animation

      this.patientService.scanPatient(code).subscribe({
        next: (patient) => {
          this.loading = false;
          this.dialogRef.close();
          this.router.navigate(['/patients', patient.id, 'ordonnances']);
        },
        error: () => {
          this.loading = false;
          alert('QR code invalide ou patient introuvable');
        }
      });

      this.buffer = '';
      event.target.value = '';
    }, 300);
  }

  close(): void {
    this.dialogRef.close();
  }
}
