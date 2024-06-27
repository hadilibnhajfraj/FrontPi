import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AllergieService } from "../../app/service/allergie.service";
import { RepasService } from "../../app/service/repas.service";

@Component({
  selector: "app-repas",
  templateUrl: "./repas.component.html",
  styleUrls: ["./repas.component.css"],
})
export class RepasComponent implements OnInit {
  selectedDate: string;
  allergies: any[] = [];
  ajoutAllergie: boolean = false;
  nouvelleAllergie: string = "";

  constructor(
    private route: ActivatedRoute,
    private allergieService: AllergieService,
    private repasService: RepasService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.selectedDate = params["date"];
    });
    this.loadAllergies();
  }

  loadAllergies(): void {
    this.allergieService.getAllergies().subscribe((data) => {
      this.allergies = data;
    });
  }

  onSubmit(repasForm: NgForm) {
    const formData = repasForm.value;

    // Récupérer les allergies sélectionnées
    formData.allergiesEleve = this.allergies
      .filter((allergie) => allergie.selected)
      .map((allergie) => allergie.allergene);

    this.repasService.addRepas(formData).subscribe(
      (response) => {
        console.log("Repas ajouté avec succès", response);
        alert('Repas ajouté avec succès');

        // Rediriger vers le tableau de bord
        this.router.navigate(['/calendrier']);
      },
      (error) => {
        console.error("Erreur lors de l'ajout du repas", error);
      }
    );
  }

  ajouterAllergie() {
    this.ajoutAllergie = true;
  }

  submitNouvelleAllergie() {
    this.allergieService.addAllergie(this.nouvelleAllergie).subscribe(
      (response) => {
        // Réactualiser la liste des allergies après l'ajout
        this.loadAllergies();
        // Masquer le champ de saisie après l'ajout
        this.ajoutAllergie = false;
        this.nouvelleAllergie = "";
        // Recharger la page après l'ajout réussi
        window.location.reload();
      },
      (error) => {
        if (error.status === 400 && error.error === "L'allergène existe déjà") {
          alert("L'allergène existe déjà");
        } else {
          alert("Erreur lors de l'ajout de l'allergie");
        }
        console.error("Erreur lors de l'ajout de l'allergie", error);
      }
    );
  }
}
