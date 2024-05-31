import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3001/cours/all';
  private AddCoursUrl = 'http://localhost:3001/cours/add';
  private deleteCoursUrl = 'http://localhost:3001/cours/drop';
  private updateCoursUrl = 'http://localhost:3001/cours/update';
  private apiUrlclasse = 'http://localhost:3001/classes/all';
  private apiUrlMatiere = 'http://localhost:3001/matiere/all';
  private apiUrlsearch = 'http://localhost:3001/cours/search';

  private AddExerciceUrl = 'http://localhost:3001/exercice/add';
  private deleteExerciceUrl = 'http://localhost:3001/exercice/drop';
  private updateExerciceUrl = 'http://localhost:3001/exercice/update'
  private allExerciceUrl = 'http://localhost:3001/exercice/all'

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private _httpClient: HttpClient) { }



  getCours() {
    return this._httpClient.get<any[]>(this.apiUrl);
  }
  getExercice() {
    return this._httpClient.get<any[]>(this.allExerciceUrl);
  }

  getClasse() {
    return this._httpClient.get<any[]>(this.apiUrlclasse);
  }

  getMatiere() {
    return this._httpClient.get<any[]>(this.apiUrlMatiere);
  }

  addCours(coursData: any) {
    return this._httpClient.post<any>(this.AddCoursUrl, coursData);
  }

  deleteCours(id: any) {
    const deleteUrl = `${this.deleteCoursUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateCours(formData: FormData) {
    return this._httpClient.put<any>(`${this.updateCoursUrl}/${formData.get('_id')}`, formData);
  }
  
  searchCours(criteria: any) {
    const params = new HttpParams({ fromObject: criteria });
    return this._httpClient.get<any[]>(this.apiUrlsearch, { params });
  }


  addExercice(exerciceData: any) {
    return this._httpClient.post<any>(this.AddExerciceUrl, exerciceData);
  }

  deleteExercice(id: any) {
    const deleteUrl = `${this.deleteExerciceUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateExercice(formData: FormData) {
    return this._httpClient.put<any>(`${this.updateExerciceUrl}/${formData.get('_id')}`, formData);
  }
}
