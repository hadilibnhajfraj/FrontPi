import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  fieldTextType: boolean = false;
  year = new Date().getFullYear();

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.token) {
          alert("login avec succées")
          this.router.navigate(['/dashboard']); // Redirigez vers le tableau de bord après une authentification réussie
        }
      },
      error => {
        console.error(error);
        // Gérer l'échec de l'authentification
      }
    );
  }
}