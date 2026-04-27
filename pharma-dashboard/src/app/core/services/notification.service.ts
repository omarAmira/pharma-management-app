// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  icon: string;
  color: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _notifications = new BehaviorSubject<Notification[]>([
    { id: 1, icon: 'warning',       color: '#e53e3e', title: 'Stock critique — Metformine',  message: 'Seulement 3 boîtes restantes',    time: 'Il y a 10 min', read: false },
    { id: 2, icon: 'schedule',      color: '#f0b429', title: 'Alerte péremption',             message: 'Amoxicilline expire dans 7 jours', time: 'Il y a 1h',    read: false },
    { id: 3, icon: 'shopping_cart', color: '#3182ce', title: 'Commande #2847 reçue',          message: '18 références livrées',           time: 'Il y a 2h',    read: false },
    { id: 4, icon: 'person_add',    color: '#2aad84', title: 'Nouveau patient enregistré',    message: 'Feriel Bouzid — Dr. Mansouri',   time: 'Il y a 3h',    read: false },
  ]);

  notifications$ = this._notifications.asObservable();

  get unreadCount(): number {
    return this._notifications.value.filter(n => !n.read).length;
  }

  markAllRead(): void {
    this._notifications.next(
      this._notifications.value.map(n => ({ ...n, read: true }))
    );
  }
}