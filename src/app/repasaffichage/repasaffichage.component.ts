import { Component, OnInit } from "@angular/core";
import { Repas } from "../model/repas/Repas";
import { RepasService } from "../service/repas.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-repasaffichage",
  templateUrl: "./repasaffichage.component.html",
  styleUrls: ["./repasaffichage.component.css"],
})
export class RepasaffichageComponent implements OnInit {
  repasList: Repas[] = [];

  constructor(private repasService: RepasService,private router: Router) {}

  ngOnInit(): void {
    this.repasService.getAll().subscribe((data: Repas[]) => {
      this.repasList = data;
      console.log(data)
    });
  }
  navigateToDashboard() {
    this.router.navigate(['/calendrier']);
  }
  supp(id: string) {
    this.repasService.deleteRepas(id).subscribe(
      response => {

        console.log('Repas supprimé avec succès:', response);
        // Mettez à jour votre liste de repas localement après la suppression
        this.repasList = this.repasList.filter(repas => repas._id !== id);
        window.location.reload();
        alert('Repas supprimé avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression du repas:', error);
      }
    );
  }
  editRepas(id: string) {
    this.router.navigate(['/modifRepas', id]);
  }
}
