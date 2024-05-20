import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})
export class RepasComponent implements OnInit {
  selectedDate: string;
  allergies: any[] = [];
  ajoutAllergie: boolean = false;
  nouvelleAllergie: string;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
    });

    // Charger les allergies depuis le backend
    this.http.get<any[]>('http://localhost:3000/alergie/getAlergie').subscribe(data => {
      this.allergies = data;
    });
  }

  onSubmit(repasForm: NgForm) {
    const formData = repasForm.value;

    // Récupérer les allergies sélectionnées
    formData.allergiesEleve = this.allergies
      .filter(allergie => allergie.selected)
      .map(allergie => allergie.allergene);

    this.http.post('http://localhost:3000/repas/add', formData)
      .subscribe(response => {
        console.log('Repas ajouté avec succès', response);
      }, error => {
        console.error('Erreur lors de l\'ajout du repas', error);
      });
  }


ajouterAllergie() {
  this.ajoutAllergie = true;
}

submitNouvelleAllergie() {
  // Envoyer la nouvelle allergie au backend pour l'ajouter à la base de données
  this.http.post('http://localhost:3000/alergie/add', { allergene: this.nouvelleAllergie }).subscribe(response => {
    // Actualiser la liste des allergies après l'ajout
    this.http.get<any[]>('http://localhost:3000/alergie/getAlergie').subscribe(data => {
      this.allergies = data;
    });
    // Masquer le champ de saisie après l'ajout
    this.ajoutAllergie = false;
    this.nouvelleAllergie = '';
  }, error => {
    console.error('Erreur lors de l\'ajout de l\'allergie', error);
  });
}
}
