import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {


  private apiUrl = 'http://localhost:3000/etudiant/all';
  private AddEtudiantUrl = 'http://localhost:3000/etudiant/add';
  private deleteEtudiantUrl = 'http://localhost:3000/etudiant/drop';
  private updateEtudiantUrl = 'http://localhost:3000/etudiant/update';
  private apiUrlclasse = 'http://localhost:3000/classes/all';

  /////// observation
  private observationUrl = 'http://localhost:3000/observation/all';
  private AddObservationUrl = 'http://localhost:3000/observation/add';
  private deleteObservationUrl = 'http://localhost:3000/observation/drop';
  private updateObservationUrl = 'http://localhost:3000/observation/update';



  private addDevoirRenduUrl = 'http://localhost:3000/devoir/add';
  private getDevoirsRendusUrl = 'http://localhost:3000/devoir/all';
  private updateDevoirsRendusUrl = 'http://localhost:3000/devoir/update';
  private deleteDevoirUrl = 'http://localhost:3000/devoir/drop';


  private sendMailUrl = 'http://localhost:3000/devoir/sendEmail'; // Ajoutez l'URL pour l'envoi d'e-mail


  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private _httpClient: HttpClient) { }



  getEtudiants() {
    return this._httpClient.get<any[]>(this.apiUrl);
  }

  getClasse() {
    return this._httpClient.get<any[]>(this.apiUrlclasse);
  }

  sendMail(to: string, subject: string, text: string) {
    return this._httpClient.post<any>(this.sendMailUrl, { to, subject, text }, this.httpOptions);
  }

  addEtudiant(etudiantData: any) {
    return this._httpClient.post<any>(this.AddEtudiantUrl, etudiantData);
  }

  deleteEtudiant(id: any) {
    const deleteUrl = `${this.deleteEtudiantUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateEtudiant(formData: FormData) {
    return this._httpClient.put<any>(`${this.updateEtudiantUrl}/${formData.get('_id')}`, formData);
  }

  getObservations() {
    return this._httpClient.get<any[]>(this.observationUrl);
  }

  addObservation(observationData: any) {
    return this._httpClient.post<any>(this.AddObservationUrl, observationData);
  }

  deleteObservation(id: any) {
    const deleteUrl = `${this.deleteObservationUrl}/${id}`;
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }

  updateObservation(updatedObservationData: any) {
    const url = `${this.updateObservationUrl}/${updatedObservationData._id}`;
    return this._httpClient.put<any>(url, updatedObservationData);
  }


  addDevoir(devoirData: any) {
    return this._httpClient.post<any>(this.addDevoirRenduUrl, devoirData);
  }

  getDevoirs() {
    return this._httpClient.get<any[]>(this.getDevoirsRendusUrl);
  }


  updateDevoir(formData: FormData) {
    return this._httpClient.put<any>(`${this.updateDevoirsRendusUrl}/${formData.get('_id')}`, formData);
  }

  deleteDevoir(id: any) {
    const deleteUrl = `${this.deleteDevoirUrl}/${id}`;
    console.log('deleteUrl', deleteUrl)
    return this._httpClient.delete<any>(deleteUrl, this.httpOptions);
  }
  
}


