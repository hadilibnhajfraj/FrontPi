import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private baseUrl = 'http://localhost:3000/users'; // Remplacez par l'URL de votre serveur backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }, { headers }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn = true;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }
}
