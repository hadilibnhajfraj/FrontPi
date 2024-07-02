import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banque } from '../model/Banque';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  private baseUrl = 'http://localhost:3000/banque'; // Adjust the base URL to match your backend

  constructor(private http: HttpClient) {}

  // Add a new banque
  addBanque(chequeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/${chequeId}`, null, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get all banques
  getBanques(): Observable<Banque[]> {
    return this.http.get<Banque[]>(`${this.baseUrl}/show`);
  }

  // Update a banque
  updateBanque(id: string, banque: Banque): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, banque, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete a banque
  deleteBanque(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
