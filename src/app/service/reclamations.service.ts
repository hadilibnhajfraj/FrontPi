import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {

  private apiUrl = 'http://localhost:3000/reclamation';
  private apiUrl1 = 'http://localhost:3000/responce'; // Adjust the URL as necessary

  constructor(private http: HttpClient) { }

  getReclamations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/showall`);
  }
  addReclamation(reclamation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, reclamation);
  }
  deleteReclamation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  getReclamationById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/findreclamation/${id}`);
  }
  updateReclamation(id: string, reclamation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, reclamation);
  }
  getReclamationandlire(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lire/${id}`);
  }

  getResponces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/showall`);
  }
  addResponce(reclamation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}/add`, reclamation);
  }
  deleteResponce(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl1}/delete/${id}`);
  }
  updateResponce(id: string, reclamation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl1}/update/${id}`, reclamation);
  }
  getAllResponsesForReclamation(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/${id}/responses`);
  }
  getResponce(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl1}/show/${id}`);
  }
  getNotification(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/notification`);
  }
}
