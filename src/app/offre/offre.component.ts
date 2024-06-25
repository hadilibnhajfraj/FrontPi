import { ActivatedRoute, Router } from '@angular/router'; // Import de Router
import { OffreService } from '../service/offre.service'; // Import du service OffreService
import { FactureService } from '../service/facture.service'; // Import du service FactureService
import { Offre } from '../model/Offre'; // Import des modèles Offre et Frais
import { Facture } from '../model/Facture'; // Import du modèle Facture
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offre: Offre;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Injection de Router
    private offreService: OffreService,
    private factureService: FactureService // Injection de FactureService
  ) { }

  ngOnInit(): void {
    const offreId = this.route.snapshot.paramMap.get('id');
    this.offreService.getOffreById(offreId).subscribe(
      data => {
        this.offre = data;
      },
      error => {
        console.error('Erreur lors de la récupération de l\'offre', error);
      }
    );
  }

  // Méthode pour enregistrer la facture
  enregistrerFacture(): void {
    const facture: Facture = {
      reference: '', // Remplissez avec la référence de facture si nécessaire
      date: new Date(), // Remplissez avec la date actuelle si nécessaire
      montantApresRemise: this.offre.montantApresRemise,
      statut: 'encours', // Remplissez avec le statut de facture si nécessaire
      client: '', // Remplissez avec le nom du client si nécessaire
      offreId: this.offre._id,
  
      frais: this.offre.frais,
      userName: '' // Remplissez avec le nom de l'utilisateur si nécessaire
      ,
      _id: undefined
    };

    // Utilisez le service FactureService pour ajouter la facture
    this.factureService.addFacture(facture).subscribe(
      response => {
        console.log('Facture ajoutée avec succès:', response);
        // Redirigez l'utilisateur vers '/notification' après l'ajout réussi de la facture
        this.router.navigate(['/notifications']);
      },
      error => {
        console.error('Erreur lors de l\'enregistrement de la facture', error);
      }
    );
  }
  retour(): void {
    this.router.navigate(['/icons']);
  }
}
