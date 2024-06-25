import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cheque } from '../model/Cheque';

@Injectable({
  providedIn: 'root'
})
export class ChequeService {
  private baseUrl = 'http://localhost:3000/cheque'; // Adjust the base URL to match your backend

  constructor(private http: HttpClient) {}

  addCheque(cheque: Cheque): Observable<any> {
    return this.http.post(`${this.baseUrl}/${cheque.factureId}/addcheque`, cheque, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getCheques(): Observable<Cheque[]> {
    return this.http.get<Cheque[]>(`${this.baseUrl}/show`);
  }

  getChequeById(id: string): Observable<Cheque> {
    return this.http.get<Cheque>(`${this.baseUrl}/${id}`);
  }

  updateCheque(id: string, cheque: Cheque): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, cheque, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteCheque(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  checkChequeEcheance(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/checkecheance`);
  }

  getNonPaidCheques(): Observable<Cheque[]> {
    return this.http.get<Cheque[]>(`${this.baseUrl}/show/nonpaid`);
  }

  getMontantRestant(factureId: string): Observable<{ montantRestant: number }> {
    return this.http.get<{ montantRestant: number }>(`${this.baseUrl}/factures/${factureId}/montantRestant`);
  }
}
