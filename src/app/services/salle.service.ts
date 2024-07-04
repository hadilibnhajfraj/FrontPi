import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../model/salle.model';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://localhost:3000/salle'; // URL de l'API pour les salles

  constructor(private http: HttpClient) {}

  // Récupérer toutes les salles depuis l'API
  getSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/show`);
  }

  // Ajouter une nouvelle salle
  updateSalle(salle: Salle): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${salle._id}`, salle);
  }
  addSalle(salle: Salle): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add`, salle);
  }
  deleteSalle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
