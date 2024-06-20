import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
<<<<<<< HEAD
import { Observable, from } from 'rxjs';
=======
import { Observable } from 'rxjs';
>>>>>>> 9ade91583598619c03863e7257b4529a2e386e00
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
<<<<<<< HEAD
          localStorage.setItem('role', response.role);
=======
          this.loggedIn = true;
>>>>>>> 9ade91583598619c03863e7257b4529a2e386e00
        }
      })
    );
  }

  isLoggedIn(): boolean {
<<<<<<< HEAD
    return !!localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('role');
=======
    return this.loggedIn;
>>>>>>> 9ade91583598619c03863e7257b4529a2e386e00
  }

  logout() {
    localStorage.removeItem('token');
<<<<<<< HEAD
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
=======
    this.loggedIn = false;
>>>>>>> 9ade91583598619c03863e7257b4529a2e386e00
  }
}
