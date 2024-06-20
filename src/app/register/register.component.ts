<<<<<<< HEAD

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/AuthService';
=======
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
>>>>>>> 9ade91583598619c03863e7257b4529a2e386e00

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
<<<<<<< HEAD
export class RegisterComponent {
  user: any = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    countryCode: '',
    authorities: 'parent' // Default value
  };

  constructor(
    private userService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.register(this.user).subscribe(
      response => {
        console.log('User registered successfully', response);
        alert('User registered successfully')
        this.router.navigate(['/login']);
      },
      error => {
        alert('Verifier vos entreés :)')
        console.error('Error registering user', error);
      }
    );
  }

  loginWithFacebook() {
    // Implémentez la logique de connexion avec Facebook
    window.location.href = 'http://your-backend-url/auth/facebook';
  }

  loginWithGoogle() {
    // Implémentez la logique de connexion avec Google
    window.location.href = 'http://your-backend-url/auth/google';
  }
}
=======
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
>>>>>>> 9ade91583598619c03863e7257b4529a2e386e00
