import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EtudiantService } from '../../services/etudiant.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-eleve",
  templateUrl: "./eleve.component.html",
  styleUrls: ["./eleve.component.css"],
})
export class EleveComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private etudiantService: EtudiantService, private toastr: ToastrService) { }

  activeTab = 1;
  id_user = '664677115eb942fdc85aa230';

  studentForm = this.formBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    adresse: ["", [Validators.required]],
    niveau: ["", [Validators.required]],
    date_de_naissance: ["", [Validators.required]],
    familialStatus: ["", [Validators.required]],
    classe: ['', Validators.required],
    image: [null, Validators.required] 

  });

  classes: any[] = [];
  etudiants: any[] = [];

  openedEditEtudiant: boolean = false;
  editEtudiant: any;
  dataFile: any | undefined;
  fileTitle: string | undefined;

  ngOnInit(): void {
    this.allEtudiant();
    this.loadClasses();
  }

  loadClasses(): void {
    this.etudiantService.getClasse().subscribe(
      (data) => {
        this.classes = data;
        console.log('Classes loaded:', this.classes);
      },
      (error) => {
        console.error('Error loading classes:', error);
      }
    );
  }


  saveStudent(): void {
    if (this.studentForm.valid) {
      const selectedClasse = this.classes.find(c => c._id === this.studentForm.value.classe);

      if (!selectedClasse) {
        console.error('Selected class not found in classes array.');
        return;
      }

      const etudiantData = {
        nom: this.studentForm.value.firstName,
        prenom: this.studentForm.value.lastName,
        date_de_naissance: this.studentForm.value.date_de_naissance,
        adresse: this.studentForm.value.adresse,
        id_user: this.id_user,
        niveau: this.studentForm.value.niveau,
        situation_familiale: this.mapFamilialStatus(this.studentForm.value.familialStatus),
        classe: {
          _id: selectedClasse._id,
          nom: selectedClasse.nom
        }
      };

      const formData = new FormData();
      Object.keys(etudiantData).forEach(key => {
        if (typeof etudiantData[key] === 'object' && etudiantData[key] !== null) {
          formData.append(key, JSON.stringify(etudiantData[key]));
        } else {
          formData.append(key, etudiantData[key]);
        }
      });

      // Ajouter l'image à FormData si disponible
      if (this.dataFile) {
        formData.append('image', this.dataFile, this.dataFile.name); // Ajoute l'image avec son nom
      }

      console.log('FormData before sending:', formData);

      this.etudiantService.addEtudiant(formData).subscribe(
        (response) => {
          console.log('Add student response:', response);
          this.toastr.success('Étudiant ajouté avec succès!', 'Succès');
          this.allEtudiant();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding student:', error);
          this.toastr.error('Erreur lors de l\'ajout de l\'étudiant.', 'Erreur');
        }
      );
    } else {
      this.toastr.error('Veuillez remplir correctement le formulaire.', 'Erreur de validation');
    }
  }





  selectFile(event: any) {
    if (event.target.files.length > 0) {
      this.dataFile = event.target.files[0];
      this.fileTitle = this.dataFile.name;
      console.log('Selected file:', this.dataFile);
    }
  }

  // Method to map familialStatus value to server accepted value
  private mapFamilialStatus(status: string): string {
    switch (status) {
      case 'single':
        return 'Célibataire';
      case 'married':
        return 'Marié(e)';
      case 'divorced':
        return 'Divorcé(e)';
      case 'widowed':
        return 'Veuf/Veuve';
      default:
        return ''; // Gérer le cas par défaut si nécessaire
    }
  }

  allEtudiant(): void {
    this.etudiantService.getEtudiants().subscribe(
      (etudiant) => {
        etudiant.forEach(etudiant => {
        
          if (typeof etudiant.classe == 'string') {
            etudiant.classe = JSON.parse(etudiant.classe);
          }
        });
        this.etudiants = etudiant;
        console.log('etudiant', this.etudiants)

      },
      (error) => {
        console.error('Erreur lors de la récupération des etudiants:', error);
      }
    );
  }

  deleteEtudiant(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce etudiant ?')) {
      this.etudiantService.deleteEtudiant(id).subscribe(
        () => {
          this.toastr.success('Etudiant supprimé avec succès', 'Succès');
          this.allEtudiant();
        },
        (error) => {
          this.toastr.error('Erreur lors de la suppression du etudiant', 'Erreur');
        }
      );
    }
  }

  resetForm(): void {
    this.studentForm.reset();

  }
  openEditModal(etudiant: any) {
    this.editEtudiant = etudiant;
    this.populateForm(etudiant);

    this.openedEditEtudiant = true;
  }
  private mapServerFamilialStatus(status: string): string {
    switch (status) {
      case 'Célibataire':
        return 'single';
      case 'Marié(e)':
        return 'married';
      case 'Divorcé(e)':
        return 'divorced';
      case 'Veuf/Veuve':
        return 'widowed';
      default:
        return ''; // Handle default case if needed
    }
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
  populateForm(etudiant: any): void {
    // Map server familial status to form value
    const familialStatus = this.mapServerFamilialStatus(etudiant.situation_familiale);
    if (typeof etudiant.classe == 'string') {
      etudiant.classe = JSON.parse(etudiant.classe);
    }

    // Populate the form with the student's data
    this.studentForm.patchValue({
      firstName: etudiant.nom,
      lastName: etudiant.prenom,
      date_de_naissance: this.formatDate(etudiant.date_de_naissance),
      adresse: etudiant.adresse,
      niveau: etudiant.niveau,
      familialStatus: familialStatus,
      classe: etudiant.classe ? etudiant.classe._id : "" // Utilise classeObj._id s'il est défini
    });

  }

  updateEtudiant(): void {
    if (this.studentForm.valid && this.editEtudiant) {
      console.log('Updating student:', this.editEtudiant._id);

      const selectedClasse = this.classes.find(c => c._id === this.studentForm.value.classe);

      if (!selectedClasse) {
        console.error('Selected class not found in classes array.');
        return;
      }

      const updatedEtudiantData = {
        _id: this.editEtudiant._id,
        nom: this.studentForm.value.firstName,
        prenom: this.studentForm.value.lastName,
        date_de_naissance: this.studentForm.value.date_de_naissance,
        adresse: this.studentForm.value.adresse,
        id_user: this.id_user,
        niveau: this.studentForm.value.niveau,
        situation_familiale: this.mapFamilialStatus(this.studentForm.value.familialStatus), // Map to server value
        classe: {
          _id: selectedClasse._id,
          nom: selectedClasse.nom
        }
      };

      const formData = new FormData();
      Object.keys(updatedEtudiantData).forEach(key => {
        if (typeof updatedEtudiantData[key] === 'object' && updatedEtudiantData[key] !== null) {
          formData.append(key, JSON.stringify(updatedEtudiantData[key]));
        } else {
          formData.append(key, updatedEtudiantData[key]);
        }
      });

      // Ajouter l'image à FormData si disponible
      if (this.dataFile) {
        formData.append('image', this.dataFile, this.dataFile.name); // Ajoute l'image avec son nom
      }

      console.log('Updated student data:', updatedEtudiantData);

      this.etudiantService.updateEtudiant(formData).subscribe(
        (response) => {
          console.log('Service response:', response);
          this.toastr.success('Étudiant mis à jour avec succès!', 'Succès');
          this.allEtudiant();
          this.closeEditModal(); // Fermer le modal après la mise à jour réussie
        },
        (error) => {
          console.error('Error updating student:', error);
          this.toastr.error('Erreur lors de la mise à jour de l\'étudiant.', 'Erreur');
        }
      );
    } else {
      console.log('Invalid form or missing edit student data.');
      this.toastr.error('Veuillez remplir correctement le formulaire.', 'Erreur de validation');
    }
  }

  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }
  
  closeEditModal() {
    this.openedEditEtudiant = false;
    this.resetForm();

  }
}
