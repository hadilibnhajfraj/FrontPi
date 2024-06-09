import { Component, OnInit } from '@angular/core';
import { Chauffeur } from '../model/Chauffeur';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affiche-chauffeur',
  templateUrl: './affiche-chauffeur.component.html',
  styleUrls: ['./affiche-chauffeur.component.css']
})
export class AfficheChauffeurComponent implements OnInit {

  chauffeurs: Chauffeur[] = [];
  constructor(private busService: BusService,private router: Router) {}

  ngOnInit(): void {
    this.busService.getAllChauffeur().subscribe(
      (data: Chauffeur[]) => {
        this.chauffeurs = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching bus data:', error);
      }
    );
  }

  navigateToDashboard() {
    this.router.navigate(['/ajoutchauffeur']);
  }
  supp(id: string) {
    this.busService.deleteChauffeur(id).subscribe(
      response => {

        console.log('Chauffeur supprimé avec succès:', response);
        // Mettez à jour votre liste de repas localement après la suppression
        this.chauffeurs = this.chauffeurs.filter(chauffeur => chauffeur._id !== id);
        window.location.reload();
        alert('Chauffeur supprimé avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression du Chauffeur:', error);
      }
    );
  }
  edit(id: string) {
    this.router.navigate(['/modifChauffeur', id]);
  }
}
