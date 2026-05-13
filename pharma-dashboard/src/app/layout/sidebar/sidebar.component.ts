// src/app/layout/sidebar/sidebar.component.ts
import { Component, Input } from '@angular/core';

export interface NavItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
  badgeType?: 'warn' | 'danger';
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() collapsed = false;

  mainNav: NavItem[] = [
    { icon: 'dashboard', label: 'Tableau de bord', route: '/dashboard' },
    { icon: 'inventory_2', label: 'Gestion Stock', route: '/stock', badge: 5, badgeType: 'warn' },
    { icon: 'people', label: 'Patients', route: '/patients', badge: 12, badgeType: 'danger' },
  ];

  managementNav: NavItem[] = [
    { icon: 'shopping_cart', label: 'Commandes', route: '/orders' },
    { icon: 'factory', label: 'trace', route: '/trace' },
    { icon: 'receipt_long', label: 'Ordonnances', route: '/ordonnances' },
  ];

  systemNav: NavItem[] = [
    { icon: 'bar_chart', label: 'Rapports', route: '/Rapport' },
    { icon: 'settings', label: 'Paramètres', route: '/settings' },
  ];
}