import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/core/services/stock.service';

@Component({
  selector: 'app-stock-historique',
  templateUrl: './stock-historique.component.html',
  styleUrls: ['./stock-historique.component.scss']
})
export class StockHistoriqueComponent implements OnInit {
filterAction: string = '';
  logs: any[] = [];
  filteredLogs: any[] = [];
  loading = false;
  searchText = '';

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.loadHistorique();
  }

  loadHistorique(): void {
    this.loading = true;
    this.stockService.getStockHistorique().subscribe({
      next: (data) => {
        this.logs = data.map(log => ({
          ...log,
          dateFormatted: new Date(log.dateAction).toLocaleString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
          }),
          actionLabel: this.getActionLabel(log.action),
          actionClass: this.getActionClass(log.action)
        }));
        this.filteredLogs = [...this.logs];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getActionLabel(action: string): string {
    return action === 'ADD' ? 'Ajout' : action === 'UPDATE' ? 'Modification' : 'Suppression';
  }

  getActionClass(action: string): string {
    return action === 'ADD' ? 'action-add' : action === 'UPDATE' ? 'action-update' : 'action-delete';
  }

  filterLogs(): void {
  let result = [...this.logs];

  // Filtre texte
  if (this.searchText.trim()) {
    const term = this.searchText.toLowerCase();
    result = result.filter(log =>
      log.nomMedicament?.toLowerCase().includes(term) ||
      log.details?.toLowerCase().includes(term)
    );
  }

  // Filtre par action
  if (this.filterAction) {
    result = result.filter(log => log.action === this.filterAction);
  }

  this.filteredLogs = result;
}

  resetFilters(): void {
  this.searchText = '';
  this.filterAction = '';
  this.filteredLogs = [...this.logs];
}

}