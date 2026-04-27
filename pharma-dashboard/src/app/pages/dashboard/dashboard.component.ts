// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { StockService } from '../../core/services/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { ScannerModalComponent } from '../scanner-modals/scanner-modals.component';

// Register all Chart.js components
Chart.register(...registerables);

export interface StatCard {
  label: string; value: string; icon: string;
  color: 'green' | 'gold' | 'blue' | 'red';
  trend: string; up: boolean;
}

export interface Activity {
  color: string; title: string; sub: string; time: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  stats: StatCard[] = [
    { label: "Chiffre d'affaires",  value: '48 320 DT', icon: 'payments',      color: 'green', trend: '+12,4% vs mois dernier', up: true  },
    { label: 'Références en stock', value: '1 247',     icon: 'inventory_2',   color: 'gold',  trend: '5 références critiques', up: false },
    { label: 'Patients actifs',     value: '386',       icon: 'people',        color: 'blue',  trend: '+8 nouveaux ce mois',    up: true  },
    { label: 'Méd. périmés',        value: '23',        icon: 'warning_amber', color: 'red',   trend: 'Action requise',         up: false },
  ];

  activities: Activity[] = [
    { color: '#2aad84', title: 'Vente dispensée',     sub: 'Amoxicilline — M. Trabelsi',  time: '09:14' },
    { color: '#f0b429', title: 'Stock mis à jour',    sub: 'Réception commande #2847',     time: '08:52' },
    { color: '#e53e3e', title: 'Alerte péremption',   sub: 'Metformine — expire dans 7j',  time: '08:30' },
    { color: '#3182ce', title: 'Nouvelle ordonnance', sub: 'Dr. Mansouri — Feriel B.',     time: '08:05' },
    { color: '#2aad84', title: 'Commande envoyée',    sub: 'Pharmaline — 18 réf.',         time: '07:45' },
  ];

  private chart: Chart | null = null;

  constructor(private stockService: StockService, public router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Use timeout to ensure the canvas element is in the DOM
    setTimeout(() => this.buildChart(), 150);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  private buildChart(): void {
    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Destroy previous instance if exists (e.g. on re-navigation)
    if (this.chart) { this.chart.destroy(); }

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [
          {
            label: 'Ventes (DT)',
            data: [4800, 6500, 3900, 7800, 5700, 7200, 2800],
            backgroundColor: 'rgba(42,173,132,0.75)',
            hoverBackgroundColor: 'rgba(42,173,132,1)',
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Commandes (DT)',
            data: [3200, 4200, 2400, 5500, 3600, 5000, 1600],
            backgroundColor: 'rgba(240,180,41,0.75)',
            hoverBackgroundColor: 'rgba(240,180,41,1)',
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d4f3c',
            titleFont: { family: "'DM Sans', sans-serif", size: 12 },
            bodyFont:  { family: "'DM Sans', sans-serif", size: 12 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label?.split(' ')[0]}: ${(ctx.parsed.y ?? 0).toLocaleString('fr-FR')} DT`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#8aab9f' },
          },
          y: {
            grid: { color: '#eef5f2' },
            border: { display: false },
            ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#8aab9f' },
          },
        },
      },
    });
  }

  // Helper methods used in template
  statusLabel(s: string): string {
    const map: Record<string,string> = { ok: '✓ OK', low: '⚠ Faible', empty: '✕ Critique' };
    return map[s] ?? s;
  }
  statusClass(s: string): string {
    const map: Record<string,string> = { ok: 'b-ok', low: 'b-low', empty: 'b-empty' };
    return map[s] ?? '';
  }
  progClass(s: string): string {
    const map: Record<string,string> = { ok: 'p-g', low: 'p-y', empty: 'p-r' };
    return map[s] ?? '';
  }

  onScanClick(): void {
  // Exemple : rediriger vers la page de scan ou ouvrir une modale
  this.router.navigate(['/scanner']);
  // ou afficher un message temporaire
  // alert('Fonction de scan QR à venir !');
}

openScannerModal(): void {
  const dialogRef = this.dialog.open(ScannerModalComponent, {
    width: '400px',
    disableClose: true // empêche fermeture sans action
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // ✅ Redirection vers la fiche patient après scan
      this.router.navigate(['/patients', result.id]);
    }
  });

}
}