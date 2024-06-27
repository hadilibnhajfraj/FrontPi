import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RepasService } from "../service/repas.service";
import { AllergieService } from "../service/allergie.service";

@Component({
  selector: "app-modif-repas",
  templateUrl: "./modif-repas.component.html",
  styleUrls: ["./modif-repas.component.css"],
})
export class ModifRepasComponent implements OnInit {
  repas: any = {};
  allergies: any[] = [];
  nouvelleAllergie: string = "";
  ajoutAllergie: boolean = false;

  repasAllergies: any[] = [];
  allAllergies: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private repasService: RepasService,
    private allergieService: AllergieService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.repasService.getRepas(id).subscribe(
      (data) => {
        this.repas = data;
        this.repas.jour = this.convertDate(this.repas.jour);
        this.loadAllAllergies();
      },
      (error) => {
        console.error("Erreur lors de la récupération du repas:", error);
      }
    );
  }

  convertDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  loadAllAllergies(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.repasService.getRepasAllergie(id).subscribe(
      (data: any) => {
        this.repasAllergies = data.repasAllergies;
        this.allAllergies = data.allAllergies.map((allergene) => {
          return {
            ...allergene,
            selected: this.repasAllergies.some(
              (repasAllergene) => repasAllergene._id === allergene._id
            ),
          };
        });
      },
      (error) => {
        console.error("Erreur lors du chargement des données:", error);
      }
    );
  }

  toggleAllergeneSelection(allergene: any): void {
    allergene.selected = !allergene.selected;
  }

  isAllergeneSelected(allergene: any): boolean {
    return this.repasAllergies.some(
      (repasAllergene) => repasAllergene._id === allergene._id
    );
  }


  onSubmit(form: any): void {
    const id = this.route.snapshot.paramMap.get('id');
    const selectedAllergies = Object.keys(form.value)
      .filter(key => key.startsWith('allergene_') && form.value[key])
      .map(key => key.replace('allergene_', ''));

    const updatedRepas = {
      nomRepas: this.repas.nomRepas,
      tempsRepas: this.repas.tempsRepas,
      jour: this.repas.jour,
      allergiesEleve: selectedAllergies
    };

    console.log('Submitting form with data:', updatedRepas);

    this.repasService.updateRepas(id, updatedRepas).subscribe(
      response => {
        console.log('Repas mis à jour avec succès:', response);
       this.router.navigate(['/afficheRepas']);
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
      this.nouvelleAllergie = "";
      this.ajoutAllergie = false;
    }
  }
}
