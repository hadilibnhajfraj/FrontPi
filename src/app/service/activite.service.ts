import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Activite } from "../model/Activite";

@Injectable({
  providedIn: "root",
})
export class ActiviteService {
  private baseUrl = "http://localhost:3000/activite";

  constructor(private http: HttpClient) {}

  getAllActivite(): Observable<Activite[]> {
    return this.http.get<Activite[]>(`${this.baseUrl}/getActivite`);
  }

  addActivite(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, formData);
  }

  getActiviteById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getActiviteId/${id}`);
  }

  updateActivite(id: string, updatedActivite: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatetActivite/${id}`, updatedActivite);
  }

  uploadImages(id: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/uploadImages/${id}`, formData);
  }
}
