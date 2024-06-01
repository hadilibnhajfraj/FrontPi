import { Component, OnInit } from '@angular/core';
import { Frais } from '../model/Frais';
import { FraisService } from '../service/frais.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  fraisList: Frais[] = [];
  newFrais: Frais = { nom: '', prix: null }; // Nouvelle instance de frais pour l'ajout, prix initialisé à null

  constructor(private fraisService: FraisService) {}

  ngOnInit(): void {
    this.loadFrais();
  }

  loadFrais(): void {
    this.fraisService.getAll().subscribe(data => {
      this.fraisList = data;
    });
  }

  addFrais(): void {
    if (this.isFormValid()) {
      this.fraisService.add(this.newFrais).subscribe(() => {
        alert('Frais ajouté avec succès!');
        this.newFrais = { nom: '', prix: null }; // Réinitialise le formulaire après l'ajout
        window.location.reload(); // Actualise la page
      });
    } else {
      alert('Veuillez saisir un prix valide.');
    }
  }

  editFrais(frais: Frais): void {
    this.fraisService.update(frais).subscribe(() => {
      alert('Frais modifié avec succès!');
      window.location.reload(); // Actualise la page
    });
  }

  deleteFrais(fraisId: string): void {
    this.fraisService.delete(fraisId).subscribe(() => {
      alert('Frais supprimé avec succès!');
      window.location.reload(); // Actualise la page
    });
  }

  isFormValid(): boolean {
    return this.newFrais.nom.trim() !== '' && this.newFrais.prix !== null && this.newFrais.prix > 0;
  }

  clearPrice(): void {
    if (this.newFrais.prix === 0) {
      this.newFrais.prix = null;
    }
  }

  resetPrice(): void {
    if (this.newFrais.prix === null) {
      this.newFrais.prix = 0;
    }
  }
}
