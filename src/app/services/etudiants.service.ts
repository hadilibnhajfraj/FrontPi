import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etudiant } from '../model/etusiant.model'

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private baseUrl = 'http://localhost:3000/etudiants';
  private apiUrl = 'http://localhost:3000/classe/show';
  private apiUrlp = 'http://localhost:3000/user/showParents';

  constructor(private http: HttpClient) { }

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}/show`);
  }

  addEtudiant(etudiant: Etudiant): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add`, etudiant);
  }

  updateEtudiant(etudiant: Etudiant): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update/${etudiant._id}`, etudiant);
  }

  deleteEtudiant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getParents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlp);
  }

  searchStudents(keyword: string): Observable<Etudiant[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Etudiant[]>(`${this.baseUrl}/recherche`, { params });
  }

}
