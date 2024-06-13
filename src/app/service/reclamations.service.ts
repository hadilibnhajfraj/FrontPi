import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {

  private apiUrl = 'http://localhost:3000/reclamation'; // Adjust the URL as necessary

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
}
