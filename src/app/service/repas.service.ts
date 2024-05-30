import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Repas } from "../model/repas/Repas";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RepasService {
  private baseUrl = "http://localhost:3000/repas";

  constructor(private http: HttpClient) {}

  addRepas(repasData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, repasData);
  }
  getAllRepas(): Observable<Repas[]> {
    return this.http.get<Repas[]>(`${this.baseUrl}/getAllRepas`);
  }
  getAll(): Observable<Repas[]> {
    return this.http.get<Repas[]>(`${this.baseUrl}/getRepas`);
  }
  deleteRepas(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteRepas/${id}`);
  }
  updateRepas(id: string, updatedRepas: any): Observable<any> {

    return this.http.put(`${this.baseUrl}/updatetRepas/${id}`, updatedRepas)
  }
  getRepas(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/repas/${id}`);
  }
  getRepasAllergie(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/repasallergie/${id}`);
  }
  updateRepasAllergies(id: string, allergiesEleve: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatetRepasallergie/${id}/allergies`, { allergiesEleve });
  }

}
