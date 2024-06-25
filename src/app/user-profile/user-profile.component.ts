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
  currentFilter: 'all' | 'nonPaid' = 'all'; // Ajout de la variable currentFilter

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
        this.sortCheques(); // Appliquer le tri initial
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
        this.loadCheques(); // Recharger les chèques après la suppression
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
        this.loadCheques(); // Recharger les chèques après l'encaissement
      },
      error => {
        this.toastr.error('Erreur lors de l\'encaissement du chèque.');
        console.error(error);
      }
    );
  }

  loadAllCheques() {
    this.currentFilter = 'all'; // Mettre à jour le filtre actuel
    this.loadCheques(); // Recharger les chèques avec le filtre "Tous"
  }

  loadNonPaidCheques() {
    this.currentFilter = 'nonPaid'; // Mettre à jour le filtre actuel
    this.loadCheques(); // Recharger les chèques avec le filtre "Non payés"
  }

  sortedCheques(): Cheque[] {
    // Filtrer et trier les chèques en fonction du filtre actuel
    const filteredCheques = this.currentFilter === 'nonPaid' ?
      this.cheques.filter(cheque => !cheque.paiement || cheque.paiement !== 'oui') :
      this.cheques;

    return filteredCheques.sort((a, b) => new Date(a.echeance).getTime() - new Date(b.echeance).getTime());
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

  private sortCheques() {
    this.cheques.sort((a, b) => new Date(a.echeance).getTime() - new Date(b.echeance).getTime());
  }
}
