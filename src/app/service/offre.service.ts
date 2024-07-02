import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offre } from '../model/Offre';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private baseUrl = 'http://localhost:3000/offre';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.baseUrl}/show`);
  }

  addOffre(offre: Offre): Observable<any> {
    return this.http.post(`${this.baseUrl}/addoffre`, offre);
  }

  getOffreById(id: string): Observable<Offre> {
    return this.http.get<Offre>(`${this.baseUrl}/show/${id}`);
  }
  
  getLatestOffreId(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/latest`);
  }
  
}
