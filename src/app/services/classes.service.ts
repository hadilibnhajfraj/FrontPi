import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe } from '../model/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:3000/classe'; // Remplacez par votre URL
  private apiUrl = 'http://localhost:3000/etudiant';
  constructor(private http: HttpClient) {}

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.baseUrl}/show`);
  }

  addClasse(classe: Classe): Observable<Classe> {
    return this.http.post<Classe>(`${this.baseUrl}/add`, classe);
  }

  updateClasse(classe: Classe): Observable<Classe> {
    return this.http.put<Classe>(`${this.baseUrl}/update/${classe._id}`, classe);
  }

  deleteClasse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
  changeStudentClass(studentId: string, newClassId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/changeStudentClass/${studentId}/${newClassId}`, {});
  }
}
