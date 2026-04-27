// src/app/layout/header/header.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationService, Notification } from '../../core/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  searchCtrl = new FormControl('');
  notifications: Notification[] = [];
  unreadCount = 0;
  pageTitle   = 'Tableau de bord';
  pageSubtitle = 'Vue générale de votre pharmacie';

  private readonly titleMap: Record<string, [string, string]> = {
    '/dashboard':     ['Tableau de bord',   'Vue générale de votre pharmacie'],
    '/stock':         ['Gestion du Stock',  'Inventaire et alertes de réapprovisionnement'],
    '/patients':      ['Patients',          'Fiches patients et historique ordonnances'],
    '/orders':        ['Commandes',         'Suivi des commandes fournisseurs'],
    '/suppliers':     ['Fournisseurs',      'Gestion et contacts fournisseurs'],
    '/prescriptions': ['Ordonnances',       'Traitement des prescriptions médicales'],
    '/reports':       ['Rapports',          'Statistiques et analyses de performance'],
    '/settings':      ['Paramètres',        'Configuration du système'],
  };

  constructor(
    private notifService: NotificationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Update title on route change
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const entry = this.titleMap[e.urlAfterRedirects] ?? ['PharmaDash', ''];
        this.pageTitle    = entry[0];
        this.pageSubtitle = entry[1];
      });

    // Set initial title
    const entry = this.titleMap[this.router.url] ?? ['PharmaDash', ''];
    this.pageTitle    = entry[0];
    this.pageSubtitle = entry[1];

    // Notifications
    this.notifService.notifications$.subscribe(n => {
      this.notifications = n;
      this.unreadCount   = n.filter(x => !x.read).length;
    });

    // Search
    this.searchCtrl.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
    ).subscribe(val => {
      if (!val || val.length < 2) return;
      const v = val.toLowerCase();
      if (v.includes('stock') || v.includes('médicament') || v.includes('medicament')) {
        this.router.navigate(['/stock']);
      } else if (v.includes('patient')) {
        this.router.navigate(['/patients']);
      }
    });
  }

  markAllRead(): void { this.notifService.markAllRead(); }
}