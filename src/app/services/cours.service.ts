import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  private apiUrl = 'http://localhost:3001/cours/all';
  private AddCoursUrl = 'http://localhost:3001/cours/add';
  private deleteCoursUrl = 'http://localhost:3001/cours/drop';
  private updateCoursUrl = 'http://localhost:3001/cours/update';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private _httpClient: HttpClient) { }



  getCours() {
    return this._httpClient.get<any[]>(this.apiUrl);
  }

  addCours(coursData: any) {
    return this._httpClient.post<any>(this.AddCoursUrl, coursData);
  }
  
  deleteCours(id: any) {
    const deleteUrl = `${this.deleteCoursUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateCours(coursData: any) {
    return this._httpClient.put<any>(this.updateCoursUrl, coursData, this.httpOptions);
  }
}
