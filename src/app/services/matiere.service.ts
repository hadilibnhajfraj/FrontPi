import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private _httpClient: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  private matiereUrl = 'http://localhost:3000/matiere/all';
  private AddMatiereUrl = 'http://localhost:3000/matiere/add';
  private deleteMatiereUrl = 'http://localhost:3000/matiere/drop';
  private updateMatiereUrl = 'http://localhost:3000/matiere/update';
  


  getMatiere() {
    return this._httpClient.get<any[]>(this.matiereUrl);
  }


  addMatiere(matiereData: any) {
    return this._httpClient.post<any>(this.AddMatiereUrl, matiereData);
  }


  deleteMatiere(id: any) {
    const deleteUrl = `${this.deleteMatiereUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateMatiere(matiereData: any) {
    const id = matiereData.id; // Assurez-vous que id est correctement accessible
    if (!id) {
      throw new Error('Cannot update matiere: _id is undefined or null');
    }
    return this._httpClient.put<any>(`${this.updateMatiereUrl}/${id}`, matiereData);
  }


}
