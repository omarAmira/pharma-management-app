import { Component, OnInit } from '@angular/core';
import { OrdonnanceService } from 'src/app/core/services/ordonnance.service';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-ordonnance-liste',
  templateUrl: './ordonnance-liste.component.html',
  styleUrls: ['./ordonnance-liste.component.scss'],
})
export class OrdonnanceListeComponent implements OnInit {

  ordonnances: any[] = [];
  selectedOrdonnance: any = null;
  isEditing = false;
  loading = false;
  searchText: string = '';

  // Formulaire d'édition
  editForm: any = {};

  constructor(private ordonnanceService: OrdonnanceService) {}

  ngOnInit(): void {
    this.loadAllOrdonnances();
  }

  loadAllOrdonnances(): void {
    this.loading = true;
    this.ordonnanceService.getAllOrdonnances().subscribe({
      next: (data) => {
        this.ordonnances = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur chargement ordonnances', err);
        this.loading = false;
      }
    });
  }

  // Filtrage
  get filteredOrdonnances() {
    if (!this.searchText) return this.ordonnances;
    const term = this.searchText.toLowerCase();
    return this.ordonnances.filter(o =>
      (o.patient?.nom + ' ' + o.patient?.prenom).toLowerCase().includes(term) ||
      o.sourceOrdonnance?.toLowerCase().includes(term)
    );
  }

  // Nombre d'ordonnances avec RDV aujourd'hui (optionnel)
  getOrdonnancesToday(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.ordonnances.filter(o => o.dateRdv === today).length;
  }

  showDetails(ord: any): void {
    this.selectedOrdonnance = ord;
    this.isEditing = false;
  }

  editOrdonnance(ord: any): void {
    if (!ord?.id) {
      alert("Ordonnance invalide");
      return;
    }

    this.selectedOrdonnance = ord;
    this.isEditing = true;

    const patientId = ord.patient?.id || ord.patientId;

    this.editForm = {
      patientId: patientId,
      sourceOrdonnance: ord.sourceOrdonnance || '',
      dateOrdonnance: ord.dateOrdonnance,
      dateRdv: ord.dateRdv,
      dureeTraitement: ord.dureeTraitement,
      medicaments: (ord.medicaments || []).map((m: any) => ({
        id: m.id,
        medicamentStockId: m.medicamentStock?.id || m.medicamentStockId,
        nomManuel: m.nomManuel,
        posologie: m.posologie || 1
      }))
    };

    console.log("✅ editForm corrigé :", this.editForm);
  }

  saveUpdate(): void {
    if (!this.selectedOrdonnance?.id) {
      alert("ID ordonnance manquant");
      return;
    }

    console.log("Envoi mise à jour - ID:", this.selectedOrdonnance.id);

    this.ordonnanceService.updateOrdonnance(this.selectedOrdonnance.id, this.editForm)
      .subscribe({
        next: () => {
          alert('✅ Ordonnance modifiée avec succès !');
          this.loadAllOrdonnances();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert('❌ Erreur : ' + (err.error?.message || err.message || 'Erreur inconnue'));
        }
      });
  }

  closeModal(): void {
    this.selectedOrdonnance = null;
    this.isEditing = false;
  }

  // Méthodes supplémentaires
  creerNouvelleOrdonnance(): void {
    alert("Fonctionnalité en cours de développement\n\nRedirection vers le formulaire de création...");
    // Tu pourras plus tard faire un router.navigate(['/ordonnances/nouvelle'])
  }

  deleteOrdonnance(id: number): void {
    if (confirm(`Voulez-vous vraiment supprimer l'ordonnance #${id} ?`)) {
      // Implémente delete dans le service + appel ici
      alert("Suppression non implémentée pour le moment");
    }
  }

  resetFilters(): void {
    this.searchText = '';
  }
}