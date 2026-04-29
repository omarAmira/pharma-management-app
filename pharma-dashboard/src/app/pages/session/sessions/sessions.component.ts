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
  this.stockService.getMedicaments()
    .subscribe(data => {
      this.medicamentsStock = data;

      // 🔥 re-remplir après chargement du stock
      if (this.ordonnance) {
        this.prefillDistributions();
      }
    });
}
  loadSessions(): void {
    this.sessionService.getSessions(this.ordonnanceId).subscribe(s => this.sessions = s);
  }

 loadOrdonnance(): void {
  this.ordonnanceService.getOrdonnance(this.ordonnanceId).subscribe(o => {
    this.ordonnance = o;
    this.ordonnance.medicamentsGrouped = this.prepareMedicaments(o.medicaments);

    this.prefillDistributions(); // 🔥 ICI
  });
}

prepareMedicaments(medicaments: any[]): any[] {
  const grouped: { [key: string]: any } = {};

  medicaments.forEach(m => {

    const nom = m.medicamentStock
      ? m.medicamentStock.nom
      : m.nomManuel;

    if (!grouped[nom]) {
      grouped[nom] = {
        nom,
        posologie: 1,
        unite: m.medicamentStock?.unite || '—', // 🔥 ICI
        count: 0
      };
    }

    grouped[nom].count++;
    grouped[nom].posologie = m.posologie || 1;

    // 🔥 toujours garder unité si stock existe
    if (m.medicamentStock?.unite) {
      grouped[nom].unite = m.medicamentStock.unite;
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

prefillDistributions(): void {
  if (!this.ordonnance?.medicamentsGrouped) return;

  this.distributionsManuelles = this.ordonnance.medicamentsGrouped.map(m => {
    const stockMatch = this.medicamentsStock.find(s =>
      s.nom.toLowerCase() === m.nom.toLowerCase()
    );

    return {
      searchText: m.nom,
      selectedMedicament: stockMatch || null,
      medicamentStockId: stockMatch ? stockMatch.id : null,
      quantite: 1,
      filteredMedicaments: [],
      ordonnanceMedicament: m // 🔥 IMPORTANT
    };
  });
  this.calculerQuantites(); // 🔥 IMPORTANT
this.calculerDateRdv();
}
calculerDateRdv(): void {
  if (!this.joursDistributionManuel) return;

  const today = new Date();
  today.setDate(today.getDate() + this.joursDistributionManuel);

  this.dateProchainRdvManuel = today.toISOString().split('T')[0];
}



calculerQuantites(): void {
  if (!this.distributionsManuelles?.length) return;

  this.distributionsManuelles = this.distributionsManuelles.map(d => {

    const medicament = d.ordonnanceMedicament;
    if (!medicament) return d;

    const prisesParJour = medicament.posologie || 1;

    return {
      ...d,
      quantite: prisesParJour * this.joursDistributionManuel
    };
  });
}
onJoursChange(): void {
    console.log("Jours changé:", this.joursDistributionManuel);

  this.calculerDateRdv();
  this.calculerQuantites();
}

removeDistribution(index: number): void {
  this.distributionsManuelles.splice(index, 1);
}
annulerSession(sessionId: number): void {
  if (!sessionId) return;

  const confirmation = confirm("Voulez-vous vraiment annuler cette session ?");
  if (!confirmation) return;

  this.sessionService.annulerSession(sessionId).subscribe((res) => {
    alert(res.message);
    this.loadSessions();
  });
}



}
