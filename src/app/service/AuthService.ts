import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
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
          localStorage.setItem('role', response.role);
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, user);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/listeuser`);
  }
  validateUser(userId: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/validate/${userId}`, {});
  }

  sendResetCodeByEmail(email: string): Observable<{ resetCode: string }> {
    return this.http.post<{ resetCode: string }>(`${this.baseUrl}/forgetPassword`, { email });
  }
  verifyResetCode(email: string, enteredCode: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/resetCode/${email}`, { enteredCode });
  }
  updatePassword(email: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/resetpassword/${email}`, { password });
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }
  updateUser(id: string, updatedUser: any): Observable<any> {

    return this.http.put(`${this.baseUrl}/updateUser/${id}`, updatedUser)
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/getUser/${id}`);
  }
}
