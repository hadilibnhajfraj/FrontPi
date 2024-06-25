import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Virement } from '../model/Virement';

@Injectable({
  providedIn: 'root'
})
export class VirementService {

  private baseUrl = 'http://localhost:3000'; // Remplacez par l'URL de votre serveur Node.js

  constructor(private http: HttpClient) { }

  // Ajouter un virement
  addVirement(virement: Virement): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/virement/addvirement`, virement);
  }

  // Obtenir tous les virements
  getVirements(): Observable<Virement[]> {
    return this.http.get<Virement[]>(`${this.baseUrl}/virement/show`);
  }

  // Obtenir un virement par ID
  getVirementById(id: string): Observable<Virement> {
    return this.http.get<Virement>(`${this.baseUrl}/virement/show/${id}`);
  }

  // Mettre à jour un virement
  updateVirement(id: string, virement: Virement): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/virement/update/${id}`, virement);
  }

  // Supprimer un virement
  deleteVirement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/virement/delete/${id}`);
  }
}
