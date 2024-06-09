import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bus } from "../model/Bus";
import { Chauffeur } from "../model/Chauffeur";

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
    return this.http.post<Bus>(`${this.baseUrl}/add`, bus);
  }

  getBusById(id: string): Observable<Bus> {
    return this.http.get<Bus>(`${this.baseUrl}/getBusId/${id}`);
  }

  updateBus(bus: Bus): Observable<Bus> {
    // Corrected the endpoint spelling
    return this.http.put<Bus>(`${this.baseUrl}/updateBus/${bus._id}`, bus);
  }

  addChauffeur(chauffeur: Chauffeur): Observable<Bus> {
    return this.http.post<Bus>(`${this.baseUrl}/addChauffeur`, chauffeur);
  }

  getAllChauffeur(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getChauffeur`);
  }

  deleteChauffeur(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteChauffeur/${id}`);
  }

  getChauffeurById(id: string): Observable<Chauffeur> {
    return this.http.get<Chauffeur>(`${this.baseUrl}/getChauffeurId/${id}`);
  }

  updateChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    // Corrected the endpoint and parameter type
    return this.http.put<Chauffeur>(`${this.baseUrl}/updateChauffeur/${chauffeur._id}`, chauffeur);
  }
}
