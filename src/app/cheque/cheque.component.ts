import { Component, OnInit } from '@angular/core';
import { Cheque } from '../model/Cheque';
import { ChequeService } from '../service/cheque.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.css']
})
export class ChequeComponent implements OnInit {
  id!: number;
  cheque: Cheque = {
    reference: 0,
    proprietaire: '',
    montant: 0,
    echeance: '',
    factureId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private chequeService: ChequeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cheque.factureId = params['id'];
      console.log('Facture ID:', this.cheque.factureId);  // Log to ensure the ID is being set
    });
  }

  addCheque() {
    if (this.isFormValid()) {
      this.chequeService.addCheque(this.cheque).subscribe(
        () => {
          this.toastr.success('Chèque ajouté avec succès.');
          this.cheque = { reference: 0, proprietaire: '', montant: 0, echeance: '', factureId: this.cheque.factureId };
          this.router.navigate(['/notifications']); // Adjust the route as needed
        },
        error => {
          this.toastr.error('Erreur lors de l\'ajout du chèque : ' + error.error);
          console.error(error);
        }
      );
    } else {
      this.toastr.error('Veuillez saisir des informations valides.');
    }
  }
  

  isFormValid(): boolean {
    return this.cheque.montant > 0 && this.cheque.reference > 0 && this.cheque.proprietaire.trim() !== '' && this.cheque.echeance.trim() !== '';
  }

  goBack() {
    this.router.navigate(['/notifications']); // Adjust the route as needed
  }
}
