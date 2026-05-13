import { Component } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-rapport-pdf',
  templateUrl: './rapport-pdf.component.html',
  styleUrls: ['./rapport-pdf.component.scss']
})
export class RapportPdfComponent {

  debut: string = '';
  fin: string = '';

  loading = false;

  constructor(private sessionService: SessionService) {}

  telechargerPdf() {

    if (!this.debut || !this.fin) {
      alert('Veuillez choisir les dates');
      return;
    }

    this.loading = true;

    this.sessionService
      .telechargerRapportPdf(this.debut, this.fin)
      .subscribe({

        next: (blob) => {

          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');

          a.href = url;

          a.download = 'rapport_medicaments.pdf';

          a.click();

          window.URL.revokeObjectURL(url);

          this.loading = false;
        },

        error: () => {

          alert('Erreur téléchargement PDF');

          this.loading = false;
        }
      });
  }
}