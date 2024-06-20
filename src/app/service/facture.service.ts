import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../model/Facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private baseUrl = 'http://localhost:3000/facture'; // Replace with your API URL

  constructor(private http: HttpClient) { }
  addFacture(facture: Facture): Observable<any> {
    return this.http.post(`${this.baseUrl}/addfacture`, facture);
  }

  getAll(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/show`);
  }
  get(id: string): Observable<Facture> {  // Méthode pour récupérer un frais par ID
    return this.http.get<Facture>(`${this.baseUrl}/show/${id}`);
  }

  update(id: string, facture: Facture): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, facture);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
  
  searchFactures(query: any): Observable<Facture[]> {
    let params = new HttpParams();
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        params = params.set(key, query[key]);
      }
    }
    return this.http.get<Facture[]>(`${this.baseUrl}/search`, { params });
  }
  searchFacturesByStatut(statut: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/searchStatut`, { params: { statut } });
  }

  downloadPDF(id: string): Observable<Blob> {
    // Appel de l'API pour générer le PDF
    return this.http.get(`${this.baseUrl}/generatePdf/${id}`, {
      responseType: 'blob' // Spécifie le type de réponse attendu
    });
  }

  generateQrCode(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/generateQrCode/${id}`);
  }
}
  
  


