
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  year = new Date().getFullYear();
  email: string = '';
  resetCode: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  sendResetCode(): void {
    console.log('Email entered: ' + this.email); // Log email before sending

    this.authService.sendResetCodeByEmail(this.email).subscribe(
      (response) => {
        this.resetCode = response.resetCode;
        console.log('Reset code:', this.resetCode);
        alert('Code de réinitialisation envoyé avec succès');

        // Debugging: Log the navigation
        console.log('Navigating to /generateCode with email:', this.email, 'and resetCode:', this.resetCode);

        this.router.navigate(['/generateCode', this.email, this.resetCode]);
      },
      (error) => {
        console.error(error);
        alert('Utilisateur inexistant');
      }
    );
  }
}
