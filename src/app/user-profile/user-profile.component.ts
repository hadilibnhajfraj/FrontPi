import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cheque } from '../model/Cheque';
import { ChequeService } from '../service/cheque.service';
import { BanqueService } from '../service/banque.service'; // Assurez-vous que l'importation est correcte

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  cheques: Cheque[] = [];

  constructor(
    private chequeService: ChequeService, 
    private banqueService: BanqueService, // Ajouter BanqueService dans le constructeur
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCheques();
  }

  loadCheques() {
    this.chequeService.getCheques().subscribe(
      (data: Cheque[]) => {
        this.cheques = data;
        console.log(data); // Vérifiez les données reçues dans la console du navigateur
      },
      error => {
        this.toastr.error('Erreur lors du chargement des chèques.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }

  editCheque(cheque: Cheque) {
    // Implémentez votre logique d'édition ici
    this.toastr.info(`Modification du chèque ${cheque._id}`);
  }

  deleteCheque(id: string) {
    this.chequeService.deleteCheque(id).subscribe(
      response => {
        this.toastr.success('Chèque supprimé avec succès.');
        this.loadCheques();
      },
      error => {
        this.toastr.error('Erreur lors de la suppression du chèque.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }

  encashCheque(cheque: Cheque) {
    this.banqueService.addBanque(cheque._id).subscribe(
      response => {
        this.toastr.success(`Encaissement du chèque ${cheque._id} réussi.`);
        this.loadCheques(); // Refresh the list of cheques after successful encashment
      },
      error => {
        this.toastr.error('Erreur lors de l\'encaissement du chèque.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }

  loadAllCheques() {
    this.chequeService.getCheques().subscribe(
      (data: Cheque[]) => {
        this.cheques = data;
        console.log(data); // Vérifiez les données reçues dans la console du navigateur
      },
      error => {
        this.toastr.error('Erreur lors du chargement des chèques.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }
  
  loadNonPaidCheques() {
    this.chequeService.getNonPaidCheques().subscribe(
      (data: Cheque[]) => {
        this.cheques = data;
        console.log(data); // Vérifiez les données reçues dans la console du navigateur
      },
      error => {
        this.toastr.error('Erreur lors du chargement des chèques impayés.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }
  
}
