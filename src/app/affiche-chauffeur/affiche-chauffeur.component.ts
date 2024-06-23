import { Component, OnInit } from '@angular/core';
import { Chauffeur } from '../model/Chauffeur';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';


@Component({
  selector: 'app-affiche-chauffeur',
  templateUrl: './affiche-chauffeur.component.html',
  styleUrls: ['./affiche-chauffeur.component.css']
})
export class AfficheChauffeurComponent implements OnInit {
  parentEmail: string = ''; // Propriété pour stocker l'email du parent
  message: string = ''; // Propriété pour stocker le message

  chauffeurs: Chauffeur[] = [];

  constructor(private busService: BusService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.busService.getAllChauffeur().subscribe(
      (data: Chauffeur[]) => {
        this.chauffeurs = data;
        console.log(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des chauffeurs:', error);
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
        // Mettez à jour votre liste de chauffeurs localement après la suppression
        this.chauffeurs = this.chauffeurs.filter(chauffeur => chauffeur._id !== id);
        window.location.reload(); // Recharge la page pour refléter les changements
        alert('Chauffeur supprimé avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression du chauffeur:', error);
      }
    );
  }

  edit(id: string) {
    this.router.navigate(['/modifChauffeur', id]);
  }
  envoyer(){
    this.router.navigate(['/email']);
  }

}
