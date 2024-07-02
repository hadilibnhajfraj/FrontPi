import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EtudiantService } from '../services/etudiant.service';
import { Etudiant } from '../model/etusiant.model'; // Vérifiez le nom de votre modèle

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  classes: any[] = [];
  parents: any[] = [];
  etudiantForm: FormGroup;
  niveaux: string[] = [
    '1ere jardin d\'enfant',
    '2eme jardin d\'enfant',
    '3eme jardin d\'enfant',
    '1ere année primaire',
    '2eme année primaire',
    '3eme année primaire',
    '4eme année primaire',
    '5eme année primaire',
    '6eme année primaire'
  ];
  situationsFamiliales: string[] = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf/Veuve"];
  isFormVisible: boolean = false;
  isEditMode: boolean = false;
  etudiantToUpdate: Etudiant | null = null;
  searchForm: FormGroup;
  keyword: string = '';

  constructor(
    private fb: FormBuilder,
    private etudiantService: EtudiantService,
    private toastr: ToastrService
  ) {
    this.etudiantForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      date_de_naissance: ['', [Validators.required, this.dateValidator]],
      adresse: ['', Validators.required],
      niveau: ['', Validators.required],
      situation_familiale: ['', Validators.required],
      classe: ['', Validators.required],
      id_user: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEtudiants();
    this.loadClasses();
    this.loadParents();
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(
      data => {
        this.etudiants = data;
      },
      error => {
        console.error('Erreur lors du chargement des étudiants', error);
      }
    );
  }

  loadClasses(): void {
    this.etudiantService.getClasses().subscribe(
      data => {
        this.classes = data;
      },
      error => {
        console.error('Erreur lors du chargement des classes', error);
      }
    );
  }

  loadParents(): void {
    this.etudiantService.getParents().subscribe(
      data => {
        this.parents = data;
      },
      error => {
        console.error('Erreur lors du chargement des parents', error);
      }
    );
  }

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.etudiantForm.reset();
    this.etudiantToUpdate = null;
    this.isEditMode = false;
  }

  addOrUpdateEtudiant(): void {
    if (this.etudiantForm.valid) {
      const formData = this.etudiantForm.value;
      if (this.isEditMode && this.etudiantToUpdate) {
        this.etudiantService.updateEtudiant({ ...this.etudiantToUpdate, ...formData }).subscribe(
          () => {
            this.toastr.success('Étudiant mis à jour avec succès !');
            this.loadEtudiants();
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de la mise à jour de l\'étudiant', error);
          }
        );
      } else {
        this.etudiantService.addEtudiant(formData).subscribe(
          () => {
            this.toastr.success('Étudiant ajouté avec succès !');
            this.loadEtudiants();
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'étudiant', error);
          }
        );
      }
    }
  }

  updateEtudiant(etudiant: Etudiant): void {
    this.etudiantToUpdate = etudiant;
    this.etudiantForm.patchValue(etudiant);
    this.isEditMode = true;
    this.isFormVisible = true;
  }

  deleteEtudiant(id: string): void {
    this.etudiantService.deleteEtudiant(id).subscribe(
      () => {
        this.toastr.success('Étudiant supprimé avec succès !');
        this.loadEtudiants();
      },
      error => {
        console.error('Erreur lors de la suppression de l\'étudiant', error);
      }
    );
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 4 ? null : { ageInvalid: true };
  }


  search(): void {
    console.log("Valeur de keyword:", this.keyword); // Vérifiez la valeur de keyword dans la console
    this.etudiantService.searchStudents(this.keyword).subscribe(
      data => {
        this.etudiants = data;
        console.log (data)
      },
      error => {
        console.error('Erreur lors de la recherche des étudiants', error);
      }
    );
  }


}
