import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Facture } from '../model/Facture';
import { FactureService } from '../service/facture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  factures: Facture[] = [];
  filteredFactures: Facture[] = [];
  showFilterPanel = false;
  searchQuery: any = {
    reference: '',
    userName: '',
    montant: ''
  };

  constructor(private factureService: FactureService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.loadFactures();
  }

  toggleFilterPanel() {
    this.showFilterPanel = !this.showFilterPanel;
  }

  loadFactures() {
    this.factureService.getAll().subscribe(
      (data: Facture[]) => {
        this.factures = data;
        this.filteredFactures = data;
        console.log(data); // Vérifiez les données reçues dans la console du navigateur
      },
      error => {
        this.toastr.error('Erreur lors du chargement des factures.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }

  searchFactures() {
    const query = this.searchQuery;
    if (query.statut === 'Tous') {
      this.loadFactures();
    } else {
      this.searchFacturesByStatut();
    }
  }
  

  resetSearch() {
    this.searchQuery = {
      reference: '',
      userName: '',
      montant: ''
    };
    this.filteredFactures = this.factures;
  }

  editFacture(facture: Facture) {
    this.router.navigate(['/facture', facture._id]);
  }

  deleteFacture(id: string) {
    this.factureService.delete(id).subscribe(
      response => {
        this.toastr.success('Facture supprimée avec succès.');
        this.loadFactures();
      },
      error => {
        this.toastr.error('Erreur lors de la suppression de la facture.');
        console.error(error); // Affichage de l'erreur dans la console
      }
    );
  }

  payFacture(id: string) {
    this.router.navigate(['/cheque', id]);
  }

  searchFacturesByStatut() {
    const statut = this.searchQuery.statut;
    this.factureService.searchFacturesByStatut(statut).subscribe(
      (data: Facture[]) => {
        this.filteredFactures = data;
      },
      error => {
        this.toastr.error('Erreur lors de la recherche des factures par statut.');
        console.error(error);
      }
    );
  }
  onStatutChange() {
    if (this.searchQuery.statut === 'Tous') {
      this.loadFactures();
    }
  }
}
  

