// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { StockService } from '../../core/services/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { ScannerModalComponent } from '../scanner-modals/scanner-modals.component';
import { DashboardService, StatJourDTO, PatientArriveDTO } from '../../core/services/dashboard.service';
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

calendarDays: any[] = [];
calendarMap: Map<string, number> = new Map();

currentMonth: Date = new Date();
today: string = '';
  ////// variable des patient a arrivé
  statsParJour: StatJourDTO[] = [];
  selectedPatients: PatientArriveDTO[] = [];
  selectedDate: string = '';

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

  constructor(private stockService: StockService, public router: Router, private dialog: MatDialog,  private dashboardService: DashboardService
) {}

ngOnInit(): void {
  const now = new Date();

  this.today = now.toISOString().split('T')[0]; // ✅ plus fiable
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
loadPatientsByDate(date: string): void {
  this.dashboardService.getPatientsByDate(date)
    .subscribe(res => {
      this.selectedPatients = res;
    });
}


buildCalendar(data: StatJourDTO[]): void {

  this.calendarMap.clear();

  data.forEach(d => {
    this.calendarMap.set(d.date, d.nombrePatients);
  });

  const year = this.currentMonth.getFullYear();
  const month = this.currentMonth.getMonth();

  const todayStr = this.today; // 👈 AJOUT IMPORTANT

  const lastDay = new Date(year, month + 1, 0);

  const days: any[] = [];

  for (let i = 1; i <= lastDay.getDate(); i++) {

    const dateStr =
      `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

    days.push({
      date: dateStr,
      day: i,
      count: this.calendarMap.get(dateStr) || 0,

      // 🔥 AJOUT ICI
      isToday: dateStr === todayStr
    });
  }

  this.calendarDays = days;
}
 private buildChart(): void {

  this.dashboardService.getStatsParJour().subscribe(data => {

    this.statsParJour = data;
      this.buildCalendar(data); // 🔥 AJOUT ICI


    const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.map(d => d.date),
        datasets: [
          {
            label: 'Patients par jour',
            data: data.map(d => d.nombrePatients),
            backgroundColor: 'rgba(42,173,132,0.75)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        onClick: (event, elements) => {

          if (elements.length > 0) {
            const index = elements[0].index;
            this.selectedDate = data[index].date;
            this.loadPatientsByDate(this.selectedDate);
          }
        }
      }
    });
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

previousMonth(): void {
  this.currentMonth = new Date(
    this.currentMonth.getFullYear(),
    this.currentMonth.getMonth() - 1,
    1
  );

  this.buildCalendar(this.statsParJour);
}

nextMonth(): void {
  this.currentMonth = new Date(
    this.currentMonth.getFullYear(),
    this.currentMonth.getMonth() + 1,
    1
  );

  this.buildCalendar(this.statsParJour);
}
}