
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/AuthService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  year = new Date().getFullYear();
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(private authService: AuthService, private router: ActivatedRoute, private route: Router) {}

  ngOnInit(): void {
    // Get email from route parameters
    this.email = this.router.snapshot.paramMap.get('email') || '';
  }

  updatePassword(): void {

    this.authService.updatePassword(this.email, this.password).subscribe(
      (response) => {
        this.message = 'Mot de passe mis à jour avec succès.';
        alert('Mot de passe mis à jour avec succès.')
        this.isSuccess = true;
        console.log('Mot de passe mis à jour avec succès');
        this.route.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.message = 'Erreur lors de la mise à jour du mot de passe.';
        this.isSuccess = false;
      }
    );
  }
}
