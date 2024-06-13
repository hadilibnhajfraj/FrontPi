import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }
ngOnInit(): void {
  
}
  register() {
    this.http.post<any>('http://localhost:3000/users/', { email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']); // Rediriger vers la page de connexion après l'inscription réussie
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      });
  }
}