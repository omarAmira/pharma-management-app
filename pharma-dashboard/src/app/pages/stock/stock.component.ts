// src/app/pages/stock/stock.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StockService, MedicamentStock } from '../../core/services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  searchCtrl    = new FormControl('');
  categorieCtrl = new FormControl('');
  statutCtrl    = new FormControl('');

  medicaments: any[] = [];
  openAddForm = false;
  openEditForm = false;

  newMed: MedicamentStock = {
    nom: '',
    quantiteStock: 0,
    seuil: 0,
    unite: 'COMPRIME',
    datePeremption: ''
  };
  editMed: any = null;

  stats = [
    { label: 'Références OK',     value: '0', icon: 'check_circle', color: 'green', trend: '', up: true },
    { label: 'Stock faible',      value: '0', icon: 'warning',      color: 'gold',  trend: '', up: false },
    { label: 'Stock critique',    value: '0', icon: 'error',        color: 'red',   trend: '', up: false },
  ];
categories: any;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadMedicaments();
  }

  loadMedicaments(): void {
    this.stockService.getMedicaments().subscribe(raw => {
      this.medicaments = raw.map(m => {
        const statut = m.quantiteStock === 0 ? 'empty' : m.quantiteStock < m.seuil ? 'low' : 'ok';
        const pct = m.seuil > 0 ? Math.min(100, Math.round((m.quantiteStock / m.seuil) * 100)) : 0;
        return {
          ...m,
          statut,
          pct,
          stock: m.quantiteStock,
          unite: m.unite ?? '—',
          peremption: m.datePeremption ?? '—'
        };
      });
      this.updateStats();
    });
  }

  addMedicament(): void {
    this.stockService.addMedicament(this.newMed).subscribe(m => {
      const statut = m.quantiteStock === 0 ? 'empty' : m.quantiteStock < m.seuil ? 'low' : 'ok';
      const pct = m.seuil > 0 ? Math.min(100, Math.round((m.quantiteStock / m.seuil) * 100)) : 0;
      this.medicaments.push({
        ...m,
        statut,
        pct,
        stock: m.quantiteStock,
        unite: m.unite ?? '—',
        peremption: m.datePeremption ?? '—'
      });
      this.updateStats();
      this.openAddForm = false;
      this.newMed = { nom: '', quantiteStock: 0, seuil: 0, unite: 'COMPRIME', datePeremption: '' };
    });
  }

  updateStats(): void {
    const ok = this.medicaments.filter(m => m.statut === 'ok').length;
    const low = this.medicaments.filter(m => m.statut === 'low').length;
    const empty = this.medicaments.filter(m => m.statut === 'empty').length;

    this.stats = [
      { label: 'Références OK',     value: ok.toString(), icon: 'check_circle', color: 'green', trend: '', up: true },
      { label: 'Stock faible',      value: low.toString(), icon: 'warning',      color: 'gold',  trend: '', up: false },
      { label: 'Stock critique',    value: empty.toString(), icon: 'error',        color: 'red',   trend: '', up: false },
    ];
  }

  resetFilters(): void {
    this.searchCtrl.setValue('');
    this.categorieCtrl.setValue('');
    this.statutCtrl.setValue('');
  }

  statusLabel(s: string): string { return ({ ok: '✓ OK', low: '⚠ Faible', empty: '✕ Critique' }[s] ?? s); }
  statusClass(s: string): string { return ({ ok: 'b-ok', low: 'b-low', empty: 'b-empty' }[s] ?? ''); }
  progClass(s: string): string   { return ({ ok: 'p-g', low: 'p-y', empty: 'p-r' }[s] ?? ''); }

  peremptionClass(p: string, statut: string): string {
    if (statut === 'empty') return 'exp-red';
    return 'exp-ok';
  }

    // ---------- EDIT ----------
 openEdit(m: any): void {
  console.log("xxxxx");
    this.editMed = { ...m };   // clone safe
  this.openEditForm = true;
}
updateMedicament(): void {
  this.stockService.updateMedicament(this.editMed.id, this.editMed)
    .subscribe(() => {
      this.openEditForm = false;
      this.editMed = null;
      this.loadMedicaments();
    });
}
}
