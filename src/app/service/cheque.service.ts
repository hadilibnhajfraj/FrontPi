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

  // Add a new cheque
  addCheque(cheque: Cheque): Observable<any> {
    return this.http.post(`${this.baseUrl}/${cheque.factureId}/addcheque`, cheque, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Get all cheques
  getCheques(): Observable<Cheque[]> {
    return this.http.get<Cheque[]>(`${this.baseUrl}/show`);
  }

  // Update a cheque
  updateCheque(id: string, cheque: Cheque): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, cheque, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Delete a cheque
  deleteCheque(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Check cheque echeance
  checkChequeEcheance(): Observable<Cheque[]> {
    return this.http.get<Cheque[]>(`${this.baseUrl}/checkecheance`);
  }

  // Get non-paid cheques
getNonPaidCheques(): Observable<Cheque[]> {
  return this.http.get<Cheque[]>(`${this.baseUrl}/show/nonpaid`);
}

}
