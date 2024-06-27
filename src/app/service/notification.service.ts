import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000/notification'; // Remplacez par l'URL de votre serveur Node.js
  private apiUrl = 'http://localhost:3000/inscription';
  constructor(private http: HttpClient) { }

  envoyerNotification(notification: { emailParent: string; message: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/envoyerNotification`, notification);
  }
  marquerCommeLue(notificationId: string) {
    const url = `${this.baseUrl}/marquerCommeLue/${notificationId}`;
    return this.http.put<any>(url, {});
  }

  compterNotificationsEnvoyees(emailParent: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/compternotificationsenvoyees`, {
      params: { emailParent }
    });
  }
  getNotifications(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/touteslesnotifications`, {
      params: { emailParent: email }
    });
  }
  inscrireActivite(id_activite: string, id_user: string): Observable<any> {
    const body = { id_user }; // Données à envoyer avec la requête POST

    return this.http.post(`${this.apiUrl}/inscrire/${id_activite}`, body);
  }
}
