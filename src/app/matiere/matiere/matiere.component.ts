import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private matiereService: MatiereService) { }

  id_user = '664677115eb942fdc85aa230';

  activeTab = 1;
  matieres: any[] = [];

  openedEditMatiere: boolean = false;
  editMatiere: any;

  matiereForm = this.formBuilder.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
    programme: ['', Validators.required],
    dateCreation: ['', Validators.required]
  });

  ngOnInit(): void {
    this.loadMatiere();
  }

  saveMatiere() {
    if (this.matiereForm.valid) {

      let matiereData = {
        nom: this.matiereForm.value.nom,
        description: this.matiereForm.value.description,
        programme: this.matiereForm.value.programme,
        dateCreation: this.matiereForm.value.dateCreation,
        id_user: this.id_user,
      };
      this.matiereService.addMatiere(matiereData).subscribe(
        (response) => {
          this.toastr.success('Matière added successfully!', 'Success');
          this.matiereForm.reset();
          this.loadMatiere();
        },
        (error) => {
          this.toastr.error('Error adding matière.', 'Error');
        }
      );
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
    }
  }

  loadMatiere(): void {
    this.matiereService.getMatiere().subscribe(
      (data) => {
        this.matieres = data;
      },
      (error) => {
        console.error('Error loading matieres:', error);
      }
    );
  }

  deleteMatiere(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette observation ?')) {
      this.matiereService.deleteMatiere(id).subscribe(
        () => {
          this.toastr.success('Matière supprimé avec succès', 'Succès');
          this.loadMatiere();
        },
        (error) => {
          this.toastr.error("Erreur lors de la suppression de la matière", 'Erreur');
        }
      );
    }
  }

  openEditModal(matiere: any) {
    this.editMatiere = matiere;
    this.populateForm(matiere);
    this.openedEditMatiere = true;
  }

  populateForm(matiere: any): void {
    this.matiereForm.patchValue({
      nom: matiere.nom,
      description: matiere.description,
      dateCreation: this.formatDate(matiere.dateCreation),
      programme: matiere.programme,
    });
  }

  updateMatiere() {
    if (this.matiereForm.valid && this.editMatiere) {
      const matiereData = {
        id: this.editMatiere._id,
        nom: this.matiereForm.value.nom,
        description: this.matiereForm.value.description,
        programme: this.matiereForm.value.programme,
        dateCreation: this.matiereForm.value.dateCreation,
        id_user: this.id_user,
      };
      console.log('matiereData', matiereData)
      this.matiereService.updateMatiere(matiereData).subscribe(
        () => {
          this.toastr.success('Matière mise à jour avec succès!', 'Succès');
          this.matiereForm.reset();
          this.openedEditMatiere = false;
          this.loadMatiere();
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour de la matière.', 'Erreur');
        }
      );
    } else {
      this.toastr.error('Veuillez remplir le formulaire correctement.', 'Erreur de validation');
    }
  }


  closeEditModal() {
    this.openedEditMatiere = false;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }
}
