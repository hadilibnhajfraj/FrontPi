import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepasService } from '../service/repas.service';
import { AllergieService } from '../service/allergie.service';

@Component({
  selector: 'app-modif-repas',
  templateUrl: './modif-repas.component.html',
  styleUrls: ['./modif-repas.component.css']
})
export class ModifRepasComponent implements OnInit {
  repas: any = {};
  allergies: any[] = [];
  selectedDate: string = ''; // Remplacez par votre logique de date
  nouvelleAllergie: string = '';
  ajoutAllergie: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repasService: RepasService,
    private allergieService: AllergieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.repasService.getRepas(id).subscribe(
      data => {
        this.repas = data;
        this.loadAllergies();
      },
      error => {
        console.error('Erreur lors de la récupération du repas:', error);
      }
    );
  }

  loadAllergies(): void {
    this.allergieService.getAllergies().subscribe(
      (data: any[]) => {
        this.allergies = data.map(allergie => ({
          allergene: allergie.allergene,
          selected: this.repas.allergiesEleve.includes(allergie.allergene)
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des allergies:', error);
      }
    );
  }

  onSubmit(form: any): void {
    const id = this.route.snapshot.paramMap.get('id');
    const updatedRepas = {
      ...form.value,
      allergiesEleve: this.allergies.filter(a => a.selected).map(a => a.allergene)
    };
    this.repasService.updateRepas(id, updatedRepas).subscribe(
      response => {
        console.log('Repas mis à jour avec succès:', response);
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Erreur lors de la mise à jour du repas:', error);
      }
    );
  }

  ajouterAllergie(): void {
    this.ajoutAllergie = true;
  }

  submitNouvelleAllergie(): void {
    if (this.nouvelleAllergie) {
      this.allergies.push({ allergene: this.nouvelleAllergie, selected: true });
      this.nouvelleAllergie = '';
      this.ajoutAllergie = false;
    }
  }
}
