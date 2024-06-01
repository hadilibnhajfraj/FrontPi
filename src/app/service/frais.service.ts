import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Frais } from '../model/Frais';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  private baseUrl = 'http://localhost:3000/frais';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Frais[]> {
    return this.http.get<Frais[]>(`${this.baseUrl}/show`);
  }

  add(frais: Frais): Observable<Frais> {
    return this.http.post<Frais>(`${this.baseUrl}/addfrais`, frais);
  }

  update(frais: Frais): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${frais._id}`, frais);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
