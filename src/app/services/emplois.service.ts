import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmploiService {
  private apiUrl = 'http://localhost:3000/emploie/show';
  private AddemploisUrl = 'http://localhost:3000/emploie/add';
  private apiUrlclasse ='http://localhost:3000/classe/show';
  private apiUrle = 'http://127.0.0.1:3000/emploie';
  private apiUrlMatiere = 'http://localhost:3000/matiere/show';
  private apiUrlOptions = 'http://127.0.0.1:3000/seance/options';
  private apiUrlEnseignant = 'http://127.0.0.1:3000/emploiEnseignant';
  
  constructor(private http: HttpClient) { }

  // Ajouter un nouvel emploi
  addEmploi(emploiData: any) {
    return this.http.post<any>(`${this.AddemploisUrl}`, emploiData);
  }

  getClasse() {
    return this.http.get<any[]>(this.apiUrlclasse);
  }

  // Récupérer tous les emplois
  getEmplois() {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Upload de fichier pour un emploi
  uploadFile(emploiId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/emplois/${emploiId}/upload`, formData);
  }

  getEmploiById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrle}/emp/${id}`);
  }

  extendEmploi(id: string, additionalWeeks: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrle}/${id}/extend/${additionalWeeks}`, {});
  }

  addSeance(emploiId: string, classId: string, seanceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrle}/${emploiId}/classes/${classId}/seances`, seanceData);
  }

  getMatieres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlMatiere); // Add this method
  }
  getAvailableOptions(date: string, num_seance: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlOptions}?date=${date}&num_seance=${num_seance}`).pipe(
      map((response: any) => ({
        availableSalles: response.availableSalles.map((salle: any) => ({
          id: salle._id,
          name: salle.name
        })),
        availableEnseignants: response.availableEnseignants.map((enseignant: any) => ({
          id: enseignant._id,
          fullName: `${enseignant.firstName} ${enseignant.lastName}`
        }))
      }))
    );
  }
  getSeanceById(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/seance/show/${id}`);
  }
  updateSeance(id: string , seanceData: any): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/seance/update/${id}`,seanceData);
  }
  deleteSeance(seanceId: string) {
    return this.http.delete(`http://localhost:3000/seance/delete/${seanceId}`);
  }
  cancelSeance(seanceId: string) {
    return this.http.delete(`http://localhost:3000/seance/${seanceId}/cancel`);
  }
  saveEmploi(emploiID: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrle}/save/${emploiID}`, {});
  }
  getEmploisEnseignant(enseignantID: string) {
    return this.http.get<any>(`${this.apiUrlEnseignant}/show/${enseignantID}`);
  }
  getEmploisByParent(parentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrle}/getparentemploi/${parentId}`);
  }
  deleteEmploie(emploieid: string) {
    return this.http.delete(`${this.apiUrle}/delete/${emploieid}`);
  }
}
