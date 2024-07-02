import { Component, OnInit } from '@angular/core';
import { Frais } from '../model/Frais';
import { FraisService } from '../service/frais.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  fraisList: Frais[] = [];
  newFrais: Frais = { nom: '', prix: null };

  constructor(private fraisService: FraisService, private router: Router, private toastr: ToastrService) {}

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
        this.toastr.success('Frais ajouté avec succès!');
        this.newFrais = { nom: '', prix: null };
        this.loadFrais(); // Recharge la liste des frais
      }, error => {
        this.toastr.error('Une erreur s\'est produite lors de l\'ajout du frais.');
      });
    } else {
      this.toastr.warning('Veuillez saisir un prix valide.');
    }
  }

  editFrais(frais: Frais): void {
    this.router.navigate(['/frais', frais._id]);
  }

  deleteFrais(fraisId: string): void {
    this.fraisService.delete(fraisId).subscribe(() => {
      this.toastr.success('Frais supprimé avec succès!');
      this.loadFrais(); // Recharge la liste des frais après suppression
    }, error => {
      this.toastr.error('Une erreur s\'est produite lors de la suppression du frais.');
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
