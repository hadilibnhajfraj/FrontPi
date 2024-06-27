import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notificationsList = new BehaviorSubject<any[]>([]);
  currentNotificationsList = this.notificationsList.asObservable();

  constructor() { }

  updateNotifications(notifications: any[]) {
    this.notificationsList.next(notifications);
  }
}
