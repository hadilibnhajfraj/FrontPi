
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

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.redirectByRole();
    }
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.token) {
          alert("Login réussi");
          this.redirectByRole();
        }
      },
      error => {
        console.error(error);
        // Gérer l'échec de l'authentification
      }
    );
  }

  private redirectByRole() {
    const role = this.authService.getUserRole();

    switch (role) {
      case 'admin':

        this.router.navigate(['/listUser']);
        break;
      case 'enseignant':
      case 'parent':
        this.router.navigate(['/repasAffichage']); // Redirection vers la page principale

        break;
      default:
        this.router.navigate(['/login']); // Redirection vers la page de connexion si le rôle n'est pas reconnu
        break;
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Assurez-vous que la route /register existe dans votre configuration de route
  }
}
