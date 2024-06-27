import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllergieService {

  private apiUrl = "http://localhost:3000/alergie";

  constructor(private http: HttpClient) {}

  getAllergies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAlergie`);
  }

  addAllergie(allergene: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { allergene }, { responseType: 'text' });
  }
}
