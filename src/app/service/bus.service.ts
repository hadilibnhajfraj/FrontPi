import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Bus } from "../model/Bus";
import { Chauffeur } from "../model/Chauffeur";
import { catchError } from "rxjs/operators";

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

  updateBus(id: string, busData: Partial<Bus>): Observable<Bus> {
    return this.http.put<Bus>(`${this.baseUrl}/updatetBus/${id}`, busData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
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
    return this.http.put<Chauffeur>(`${this.baseUrl}/updatetChauffeur/${chauffeur._id}`, chauffeur);
  }
}
