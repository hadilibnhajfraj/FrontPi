import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActiviteService } from '../service/activite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-acctivite',
  templateUrl: './ajout-acctivite.component.html',
  styleUrls: ['./ajout-acctivite.component.css']
})
export class AjoutAcctiviteComponent implements OnInit {
  galleryFiles: File[] = [];
ngOnInit(): void {

}
  constructor(
    private activiteService: ActiviteService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.galleryFiles = Array.from(event.target.files);
    }
  }

  onSubmit(repasForm: NgForm) {
    if (repasForm.valid && this.galleryFiles.length > 0) {
      const formData = new FormData();
      formData.append('nom', repasForm.value.nom);
      formData.append('date_act', repasForm.value.date_act);
      formData.append('description', repasForm.value.description);
      formData.append('local', repasForm.value.local);
      formData.append('nblimite', repasForm.value.nblimite);

      this.galleryFiles.forEach((file, index) => {
        formData.append(`galerie`, file, file.name);
      });

      this.activiteService.addActivite(formData).subscribe(
        (response) => {
          console.log('Activité ajoutée avec succès');
          alert('Activité ajoutée avec succès');
          this.router.navigate(['/activite']); // Navigate to the list of activities
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'activité', error);
        }
      );
    } else {
      console.log('Formulaire invalide ou aucune image téléchargée');
    }
  }
}
