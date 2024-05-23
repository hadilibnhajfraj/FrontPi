import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursService } from '../../services/cours.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  // Propriétés du composant
  imagePath: string = "/assets/img/ai.jpg";
  id_user = '664677115eb942fdc85aa230';
  id_matiere = '66468c251eb14e3da1b359ee';
  id_classe = '664678925eb942fdc85aa238';

  fileName: string = "";
  filePreview: string | ArrayBuffer | null = null;
  activeTab = 1;
  coursData: any[] = [];
  opened: boolean = false;
  openedEditCours: boolean = false;
  dataFile: any | undefined;
  fileTitle: string | undefined;
  editCours: any;

  leconForm: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    descriptionContenu: ['', Validators.required],
    planCours: ['', Validators.required],
    horaire: ['', Validators.required],
    file: [null],
  });

  constructor(private formBuilder: FormBuilder, private coursService: CoursService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.allCours();
  }

  // Méthode pour récupérer tous les cours
  allCours(): void {
    this.coursService.getCours().subscribe(
      (cours) => {
        this.coursData = cours;
        console.log('Cours récupérés:', cours);
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours:', error);
      }
    );
  }

  onSubmit() {
    if (this.leconForm.valid) {
      const coursData = {
        nom: this.leconForm.value.nom,
        horaire: this.leconForm.value.horaire,
        descriptionContenu: this.leconForm.value.descriptionContenu,
        planCours: this.leconForm.value.planCours,
        documents: this.dataFile,
        id_user: this.id_user,
        id_matiere: this.id_matiere,
        id_classe: this.id_classe
      };

      console.log('Données du cours avant création de FormData :', coursData);

      const formData = new FormData();
      Object.keys(coursData).forEach(key => {
        formData.append(key, coursData[key]);
      });
      this.coursService.addCours(formData).subscribe(
        (response) => {
          this.toastr.success('Cours ajouté avec succès', 'Succès');
          this.allCours();
          this.resetForm();
        },

      );
    }
  }



  resetForm(): void {
    this.leconForm.reset();
    this.filePreview = null;
    this.fileName = '';
  }

  selectFile(event: any) {
    this.dataFile = event.target.files[0];
    if (!this.fileTitle || this.fileTitle == '') {
      let fileName = event.target.files[0]?.name;
      this.fileTitle = fileName?.substring(0, fileName.lastIndexOf("."));
    }

  }


  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }

  openModal(): void {
    this.opened = true;
  }
  getFileNameFromPath(filePath: string): string {
    return filePath.split('/').pop();

  }


  openEditModal(cours: any) {
    this.editCours = cours; 
    this.populateForm(cours);
    this.openedEditCours = true; 
  }

  private populateForm(cours: any): void {
    this.leconForm.patchValue({
      nom: cours.nom,
      horaire: cours.horaire,
      descriptionContenu: cours.descriptionContenu,
      planCours: cours.planCours,
    });

    this.dataFile = undefined;
    this.fileTitle = undefined;

    if (cours.documents && cours.documents.length > 0) {
      const documents = cours.documents.map((document: string) => ({
        name: this.getFileNameFromPath(document),
        path: document
      }));

    }
  }

  updateCours() {
    if (this.leconForm.valid && this.editCours) {
      const updatedData = {
        nom: this.leconForm.value.nom,
        horaire: this.leconForm.value.horaire,
        descriptionContenu: this.leconForm.value.descriptionContenu,
        planCours: this.leconForm.value.planCours,
        documents: this.dataFile || this.editCours.documents,
        id_user: this.id_user,
        id_matiere: this.id_matiere,
        id_classe: this.id_classe,
        _id: this.editCours._id
      };

      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        formData.append(key, updatedData[key]);
      });

      this.coursService.updateCours(formData).subscribe(
        (response) => {
          this.toastr.success('Cours mis à jour avec succès', 'Succès');
          this.allCours();
          this.closeModal();
          this.resetForm();
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour du cours', 'Erreur');
        }
      );
    }
  }

  deleteCours(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.coursService.deleteCours(id).subscribe(
        () => {
          this.toastr.success('Cours supprimé avec succès', 'Succès');
          this.allCours();
        },
        (error) => {
          this.toastr.error('Erreur lors de la suppression du cours', 'Erreur');
        }
      );
    }
  }

  closeModal(): void {
    this.opened = false;
  }
  closeEditModal(){
    this.openedEditCours = false; 
  }

}
