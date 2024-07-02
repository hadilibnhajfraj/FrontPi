import { Component, OnInit } from '@angular/core';
import { FraisService } from '../service/frais.service';
import { OffreService } from '../service/offre.service';
import { UserService } from '../service/user.service';
import { Frais } from '../model/Frais';
import { Offre } from '../model/Offre';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  frais: Frais[] = [];
  checklist: { label: string; checked: boolean; montant: number; _id: string; }[] = [];
  totalMontant: number = 0;
  montantApresRemise: number = 0;
  remise: number = 0;
  showNotification: boolean = false;

  constructor(
    private fraisService: FraisService,
    private offreService: OffreService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFrais();
  }

  loadFrais(): void {
    this.fraisService.getAll().subscribe(data => {
      this.frais = data;
      this.checklist = this.frais.map(item => ({
        label: item.nom,
        checked: null, 
        montant: item.prix,
        _id: item._id
      }));
      this.calculateTotal();
    });
  }

  onSelectionChange(): void {
    this.calculateTotal();
  }

  submitChecklist(): void {
    const selectedItems = this.checklist.filter(item => item.checked === true);
    const userId = this.userService.getUserId();
  
    // Mapping des objets Frais correspondants à partir de leurs ID
    const fraisSelectionnes: Frais[] = selectedItems.map(item => this.frais.find(frais => frais._id === item._id));
  
    const offre: Offre = {
      frais: fraisSelectionnes,
      montant: this.totalMontant,
      remise: this.remise,
      montantApresRemise: this.montantApresRemise,
      userId: userId,
      _id: null
    };
  
    this.offreService.addOffre(offre).subscribe(
      response => {
        console.log('Offre ajoutée avec succès', response);
        this.offreService.getLatestOffreId().subscribe(
          latestIdResponse => {
            console.log('Latest Offre ID:', latestIdResponse);
            if (latestIdResponse) {
              this.router.navigate(['/offre', latestIdResponse]);
            } else {
              console.error('Latest Offre ID is null');
            }
          },
          error => {
            console.error('Erreur lors de la récupération de l\'ID de la dernière offre ajoutée', error);
          }
        );
        this.resetValues();
      },
      error => {
        console.error('Erreur lors de l\'ajout de l\'offre', error);
      }
    );
  }
  
  
  resetValues(): void {
    this.checklist.forEach(item => item.checked = false);
    this.totalMontant = 0;
    this.remise = 0;
    this.montantApresRemise = 0;
  }

  calculateTotal(): void {
    this.totalMontant = this.checklist
      .filter(item => item.checked === true)
      .reduce((sum, item) => sum + item.montant, 0);

    const selectedCount = this.checklist.filter(item => item.checked === true).length;

    if (selectedCount === 3) {
      this.remise = 15;
    } else if (selectedCount === 4) {
      this.remise = 20;
    } else if (selectedCount > 4) {
      this.remise = 25;
    } else {
      this.remise = 0;
    }

    this.montantApresRemise = this.totalMontant * (1 - this.remise / 100);
  }

  isAtLeastOneChecked(): boolean {
    return this.checklist.some(item => item.checked);
  }
}