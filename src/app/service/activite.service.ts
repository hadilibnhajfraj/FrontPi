import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Repas } from "../model/repas/Repas";
import { switchMap } from "rxjs/operators";
import { Bus } from "../model/Bus";
import { Chauffeur } from "../model/Chauffeur";
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

}
