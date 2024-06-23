import { Component, OnInit } from '@angular/core';
import { ActiviteService } from '../service/activite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  id_user: string;
  repas_id: string; // Variable pour stocker l'ID de l'activité sélectionnée

  constructor(
    private route: ActivatedRoute,
    private activiteService: ActiviteService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Récupérer l'ID de l'activité à partir des paramètres de route
    this.route.params.subscribe(params => {
      this.repas_id = params['id'];
    });
  }

  onSubmit() {
    // Appeler la méthode d'inscription avec les IDs de l'activité et de l'utilisateur
    this.inscrireActivite(this.repas_id, this.id_user);
  }

  inscrireActivite(id_activite: string, id_user: string) {
    this.notificationService.inscrireActivite(id_activite, id_user).subscribe(
      (response) => {
        console.log('Inscription réussie:', response);
        alert('inscription  avec succès');
        this.router.navigate(['/fetchActivite']); // Exemple de redirection vers une page de confirmation
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        alert('Vous etes deja inscrits ');
      }
    );
  }
}
