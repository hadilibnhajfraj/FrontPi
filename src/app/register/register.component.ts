
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
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
