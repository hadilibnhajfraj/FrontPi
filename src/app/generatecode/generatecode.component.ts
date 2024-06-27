
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generatecode',
  templateUrl: './generatecode.component.html',
  styleUrls: ['./generatecode.component.css']
})
export class GeneratecodeComponent implements OnInit {
  year = new Date().getFullYear();
  email: string = '';
  enteredCode: string = '';
  resetCode: string = ''; // stocker le reset code ici
  message: string = '';
  isSuccess: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Récupérer l'email et le resetCode des paramètres de route
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.resetCode = this.route.snapshot.paramMap.get('resetCode') || '';
  }

  verifyResetCode(): void {
    if (this.enteredCode === this.resetCode) {
      this.message = 'Code de réinitialisation valide';
      this.isSuccess = true;
      console.log('Code de réinitialisation valide');
      console.log('Email: ' + this.email);
      console.log('Entered code: ' + this.enteredCode);
          // Rediriger vers la page de mise à jour du mot de passe avec l'email en paramètre
          this.router.navigate(['/updatePassword', this.email]);
    } else {
      this.message = 'Code de réinitialisation invalide';
      this.isSuccess = false;
      console.log('Code de réinitialisation invalide');
      console.log('Email: ' + this.email);
      console.log('Entered code: ' + this.enteredCode);
    }
  }
}
