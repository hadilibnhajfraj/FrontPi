import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000/notification'; // Remplacez par l'URL de votre serveur Node.js

  constructor(private http: HttpClient) { }

  envoyerNotification(notification: { emailParent: string; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/envoyerNotification`, notification);
  }
  marquerCommeLue(notificationId: string) {
    const url = `${this.baseUrl}/marquerCommeLue/${notificationId}`;
    return this.http.put<any>(url, {});
  }
}
