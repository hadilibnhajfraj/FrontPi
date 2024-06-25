import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cheque } from '../model/Cheque';
import { ChequeService } from '../service/cheque.service';
import { BanqueService } from '../service/banque.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  cheques: Cheque[] = [];
  today: Date = new Date();
  searchText: string = '';
  

  constructor(
    private chequeService: ChequeService,
    private banqueService: BanqueService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCheques();
  }

  loadCheques() {
    this.chequeService.getCheques().subscribe(
      (data: Cheque[]) => {
        this.cheques = data;
        console.log(data);
        this.cheques.sort((a, b) => new Date(a.echeance).getTime() - new Date(b.echeance).getTime());
      },
      error => {
        this.toastr.error('Erreur lors du chargement des chèques.');
        console.error(error);
      }
    );
  }

  editCheque(cheque: Cheque) {
    this.router.navigate(['/updatecheque', cheque._id]);
  }

  deleteCheque(id: string) {
    this.chequeService.deleteCheque(id).subscribe(
      response => {
        this.toastr.success('Chèque supprimé avec succès.');
        this.loadCheques();
      },
      error => {
        this.toastr.error('Erreur lors de la suppression du chèque.');
        console.error(error);
      }
    );
  }

  encashCheque(cheque: Cheque) {
    this.banqueService.addBanque(cheque._id).subscribe(
      response => {
        this.toastr.success(`Encaissement du chèque ${cheque._id} réussi.`);
        this.loadCheques();
      },
      error => {
        this.toastr.error('Erreur lors de l\'encaissement du chèque.');
        console.error(error);
      }
    );
  }

  loadAllCheques() {
    this.chequeService.getCheques().subscribe(
      (data: Cheque[]) => {
        this.cheques = data;
        console.log(data);
        this.cheques.sort((a, b) => new Date(a.echeance).getTime() - new Date(b.echeance).getTime());
      },
      error => {
        this.toastr.error('Erreur lors du chargement des chèques.');
        console.error(error);
      }
    );
  }

  sortedCheques(): Cheque[] {
    if (!this.searchText.trim()) {
      return this.cheques;
    }

    const searchTextLower = this.searchText.toLowerCase().trim();
    return this.cheques.filter(cheque =>
      (cheque.reference && cheque.reference.toString().toLowerCase().includes(searchTextLower)) ||
      (cheque.proprietaire && cheque.proprietaire.toLowerCase().includes(searchTextLower)) ||
      (cheque.montant && cheque.montant.toString().toLowerCase().includes(searchTextLower)) ||
      (cheque.echeance && this.formatDate(cheque.echeance).includes(searchTextLower))
    );
  }

  private formatDate(date: any): string {
    if (date instanceof Date) {
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}/${month}/${year}`; // Format DD/MM/YYYY
    } else {
      return ''; // Gérer le cas où date n'est pas une instance de Date (par exemple, une chaîne ou autre)
    }
  }

  loadNonPaidCheques() {
    this.chequeService.getNonPaidCheques().subscribe(
      (data: Cheque[]) => {
        this.cheques = data;
        console.log(data);
        this.cheques.sort((a, b) => new Date(a.echeance).getTime() - new Date(b.echeance).getTime());
      },
      error => {
        this.toastr.error('Erreur lors du chargement des chèques impayés.');
        console.error(error);
      }
    );
  }
  isChequeOverdue(cheque: Cheque): boolean {
    return new Date(cheque.echeance) < this.today && cheque.paiement !== 'oui';
  }

  clearSearch() {
    this.searchText = '';
    this.applyFilter();
  }


  applyFilter() {
    // Appeler sortedCheques() à chaque changement de valeur dans searchText
    this.sortedCheques();
  }
}
