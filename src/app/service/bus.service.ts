import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Repas } from "../model/repas/Repas";
import { switchMap } from "rxjs/operators";
import { Bus } from "../model/Bus";

@Injectable({
  providedIn: "root",
})
export class BusService {
  private baseUrl = "http://localhost:3000/bus";

  constructor(private http: HttpClient) {}

  getAllBus(): Observable<Bus[]> {
    return this.http.get<Bus[]>(`${this.baseUrl}/getBus`);
  }
  deleteBus(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteBus/${id}`);
  }
  addBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(`${this.baseUrl}/add`,bus);
  }
  getAllChauffeur(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getChauffeur`);
  }
}
