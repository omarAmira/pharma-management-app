// src/app/pages/sessions/sessions.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionDTO, SessionService } from 'src/app/core/services/session.service';
import { OrdonnanceService } from 'src/app/core/services/ordonnance.service';
import { StockService } from 'src/app/core/services/stock.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss'],
})
export class SessionsComponent implements OnInit {
  ordonnanceId!: number;
  sessions: SessionDTO[] = [];
  ordonnance: any; // détails ordonnance enrichis
  loading = false;
  // formulaire session manuelle
  joursDistributionManuel: number = 7;
  dateProchainRdvManuel: string = '';
  distributionsManuelles: any[] = [];
  messageArrivee: string | null = null;
  // liste stock (à charger depuis backend)
  medicamentsStock: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private ordonnanceService: OrdonnanceService,
    private stockService: StockService,
  ) {}

  ngOnInit(): void {
    this.ordonnanceId = +this.route.snapshot.paramMap.get('id')!;
    this.loadSessions();
    this.loadOrdonnance();
    this.loadStock();
  }
  loadStock(): void {
  // ⚠️ adapte URL selon ton API
  this.stockService.getMedicaments()
    .subscribe(data => this.medicamentsStock = data);
}
  loadSessions(): void {
    this.sessionService.getSessions(this.ordonnanceId).subscribe(s => this.sessions = s);
  }

  loadOrdonnance(): void {
    this.ordonnanceService.getOrdonnance(this.ordonnanceId).subscribe(o => {
      this.ordonnance = o;
      this.ordonnance.medicamentsGrouped = this.prepareMedicaments(o.medicaments);
    });
  }

  prepareMedicaments(medicaments: any[]): any[] {
    const grouped: { [key: string]: { nom: string, posologies: string[], count: number } } = {};

    medicaments.forEach(m => {
      const nom = m.medicamentStock ? m.medicamentStock.nom : m.nomManuel;
      if (!grouped[nom]) {
        grouped[nom] = { nom, posologies: [], count: 0 };
      }
      grouped[nom].count++;
      if (m.posologie) {
        grouped[nom].posologies.push(m.posologie);
      }
    });

    return Object.values(grouped);
  }

  addDistribution(): void {
  this.distributionsManuelles.push({
    medicamentStockId: null,
    quantite: 1
  });
}

  creerSessionManuelle(): void {

  const request = {
    ordonnanceId: this.ordonnanceId,
    joursDistribution: this.joursDistributionManuel,
    dateProchainRdv: this.dateProchainRdvManuel,
    distributions: this.distributionsManuelles
  };

  this.sessionService.creerSessionManuelle(request)
    .subscribe(() => {
      this.loadSessions();
      this.distributionsManuelles = [];
    });
}
filterMedicaments(d: any) {
  const search = d.searchText?.toLowerCase() || '';

  d.filteredMedicaments = this.medicamentsStock.filter(m =>
    m.nom.toLowerCase().includes(search)
  );
}

selectMedicament(d: any, m: any) {
  d.selectedMedicament = m;
  d.medicamentStockId = m.id;
  d.searchText = m.nom;
  d.filteredMedicaments = [];
}
  creerPremiereSession(): void {
    const jours = 30;
    this.sessionService.creerPremiereSession(this.ordonnanceId, jours).subscribe(() => this.loadSessions());
  }

traiterArrivee(): void {
  this.sessionService.traiterArrivee(this.ordonnanceId).subscribe((res) => {
    this.messageArrivee = res.message;
    this.loadSessions();
  });
}
}
