import { Component, OnInit } from '@angular/core';
import { Cheque } from '../model/Cheque';
import { ChequeService } from '../service/cheque.service';
import { Virement } from '../model/Virement';
import { VirementService } from '../service/virement.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

// Déclare StripeCheckout globalement
declare var StripeCheckout: any;

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
  selectedFile: any;
  handler: any;
  montantRestant: number = 0;

  constructor(
    private route: ActivatedRoute,
    private chequeService: ChequeService,
    private virementService: VirementService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cheque.factureId = params['id'];
      console.log('Facture ID:', this.cheque.factureId);
      this.getMontantRestant(this.cheque.factureId);
    });

    this.loadStripe();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Fichier sélectionné:', this.selectedFile);
    }
  }

  addCheque() {
    if (this.isFormValid()) {
      this.chequeService.addCheque(this.cheque).subscribe(
        () => {
          this.toastr.success('Chèque ajouté avec succès.');
          this.cheque = { reference: 0, proprietaire: '', montant: 0, echeance: '', factureId: this.cheque.factureId };
          this.router.navigate(['/notifications']);
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
    this.router.navigate(['/notifications']);
  }

  pay() {
    var handler = StripeCheckout.configure({
      key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
      locale: 'auto',
      token: (token: any) => {
        console.log(token);
        // Créer un virement à envoyer au backend
        const virement: Virement = {
          referenceVirement: `VIR-${Math.floor(10000000 + Math.random() * 90000000)}`,
          factureId: this.cheque.factureId,
          montant: this.montantRestant,
          date: new Date()
        };

        // Appeler le service pour ajouter le virement
        this.virementService.addVirement(virement).subscribe(
          () => {
            this.toastr.success('Virement ajouté avec succès.');
            this.router.navigate(['/notifications']);
          },
          error => {
            this.toastr.error('Erreur lors de l\'ajout du virement : ' + error.error);
            console.error(error);
          }
        );
      }
    });

    handler.open({
      name: 'Demo Site',
      description: 'Paiement de la facture',
      amount: this.montantRestant * 100,
      currency: 'TND'
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = StripeCheckout.configure({
          key: 'pk_test_51HxRkiCumzEESdU2Z1FzfCVAJyiVHyHifo0GeCMAyzHPFme6v6ahYeYbQPpD9BvXbAacO2yFQ8ETlKjo4pkHSHSh00qKzqUVK9',
          locale: 'auto',
          token: (token: any) => {
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
      window.document.body.appendChild(s);
    }
  }

  getMontantRestant(factureId: string) {
    this.chequeService.getMontantRestant(factureId).subscribe(
      response => {
        this.montantRestant = response.montantRestant;
        console.log('Montant restant:', this.montantRestant);
      },
      error => {
        console.error('Erreur lors de la récupération du montant restant:', error);
      }
    );
  }
}
