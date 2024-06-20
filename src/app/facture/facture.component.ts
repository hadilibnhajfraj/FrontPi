import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactureService } from '../service/facture.service';
import { ToastrService } from 'ngx-toastr';
import { Facture } from '../model/Facture';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  facture: any;
  cheques: any[] = [];
  offre: any;

  constructor(
    private route: ActivatedRoute,
    private factureService: FactureService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.factureService.get(id).subscribe(
        (data: any) => {
          this.facture = data.facture;
          this.facture.id = id;  // Ensure the ID is set in the facture object
          this.cheques = data.cheques;
          this.offre = data.offre;
          console.log(data); // Vérifiez les données reçues dans la console du navigateur
        },
        error => {
          this.toastr.error('Erreur lors du chargement de la facture.');
          console.error(error); // Affichage de l'erreur dans la console
        }
      );
    }
  }

  enregistrer(): void {
    if (this.facture.reference.trim() !== '' && this.facture.date && this.facture.userName.trim() !== '') {
      this.factureService.update(this.facture.id, this.facture).subscribe(
        () => {
          this.toastr.success('Facture mise à jour avec succès.');
          this.router.navigate(['/notifications']);
        },
        error => {
          this.toastr.error('Erreur lors de la mise à jour de la facture.');
          console.error(error); // Affichage de l'erreur dans la console
        }
      );
    } else {
      this.toastr.warning('Veuillez remplir tous les champs requis.');
    }
  }

  retour(): void {
    this.router.navigate(['/notifications']);
  }
}
