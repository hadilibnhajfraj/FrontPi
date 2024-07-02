import { Component, OnInit } from '@angular/core';
import { Facture } from '../model/Facture';
import { FactureService } from '../service/facture.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  factures: Facture[] = [];
  filteredFactures: Facture[] = [];
  showFilterPanel = false;
  searchQuery: any = {
    reference: '',
    userName: '',
    montant: ''
  };
  qrCodeUrl: string | null = null;
  selectedFacture: Facture | null = null;

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
      },
      error => {
        this.toastr.error('Erreur lors du chargement des factures.');
        console.error(error);
      }
    );
  }

  showDetail(id: string) {
    this.factureService.generateQrCode(id).subscribe(
      (data: any) => {
        this.qrCodeUrl = data.qrCodeUrl;
      },
      error => {
        this.toastr.error('Erreur lors de la génération du QR code.');
        console.error(error);
      }
    );
   
  }

  downloadPDF(id: string) {
    this.factureService.downloadPDF(id).subscribe(
      () => {
        this.toastr.success('Le PDF a été téléchargé avec succès.');
      },
      error => {
        this.toastr.error('Erreur lors du téléchargement du PDF.');
        console.error(error);
      }
    );
  }

}
