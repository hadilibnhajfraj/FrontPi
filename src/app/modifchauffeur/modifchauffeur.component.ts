import { Component, OnInit } from '@angular/core';
import { Chauffeur } from '../model/Chauffeur';
import { BusService } from '../service/bus.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifchauffeur',
  templateUrl: './modifchauffeur.component.html',
  styleUrls: ['./modifchauffeur.component.css']
})
export class ModifchauffeurComponent implements OnInit {
  chauffeur: Chauffeur = {
    _id: '',
    nom: '',
    prenom: '',
    cin: '',
    email: '',
    disponibilite: true
  };

  constructor(
    private chauffeurService: BusService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getChauffeurDetails();
  }

  getChauffeurDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chauffeurService.getChauffeurById(id).subscribe(
        (data: any) => {
          this.chauffeur = data;
        },
        (error) => {
          console.error('Error fetching chauffeur details:', error);
        }
      );
    }
  }

  onSubmit(): void {
    this.chauffeurService.updateChauffeur(this.chauffeur).subscribe(
      (response) => {
        console.log('Chauffeur updated:', response);
        this.router.navigate(['/chauffeur']); // Rediriger vers la liste des chauffeurs après la modification
      },
      (error) => {
        console.error('Error updating chauffeur:', error);
      }
    );
  }
}
