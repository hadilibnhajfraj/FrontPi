import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EtudiantService } from '../../services/etudiant.service';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from '../../services/cours.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: "app-eleve",
  templateUrl: "./eleve.component.html",
  styleUrls: ["./eleve.component.css"],
})
export class EleveComponent implements OnInit {
  notificationsList=[];
  constructor(private notificationsService:NotificationsService,private formBuilder: FormBuilder, private coursService: CoursService, private etudiantService: EtudiantService, private toastr: ToastrService) {
    this.notificationsService.currentNotificationsList.subscribe(data => this.notificationsList=data)
   }

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
    image: [null]

  });


  devoirForm = this.formBuilder.group({
    nom: ["", Validators.required],
    matiere: ['', Validators.required],
    classe: ['', Validators.required],
    etudiant: ['', Validators.required],
    file: [null],

  });


  classes: any[] = [];
  etudiants: any[] = [];
  devoirs: any[] = [];
  matieres: any[] = [];

  openedEditEtudiant: boolean = false;
  openedEditDevoir: boolean = false;

  editEtudiant: any;
  editDevoir: any;

  dataFile: any | undefined;
  fileTitle: string | undefined;
  fileName: string = "";

  searchTerm: string | undefined;

  ngOnInit(): void {
    this.allEtudiant();
    this.loadClasses();
    this.loadMatieres();
    this.allDevoirs();
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



  getFileNameFromPath(filePath: string): string {
    return filePath.split('/').pop();
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


  loadMatieres(): void {
    this.coursService.getMatiere().subscribe(
      (data) => {
        this.matieres = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des matières:', error);
      }
    );
  }


  allEtudiant(): void {
    this.etudiantService.getEtudiants().subscribe(
      (etudiant) => {
        etudiant.forEach(etudiant => {

          if (typeof etudiant.classe == 'string') {
            etudiant.classe = JSON.parse(etudiant.classe);
          }

        });
        // Filter students by id_user
        this.etudiants = etudiant.filter(et => et.id_user == this.id_user);
        this.etudiants = etudiant;


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
    if (etudiant.image && etudiant.image.length > 0) {
      const documentNames = etudiant.image.map((document: string) => this.getFileNameFromPath(document));
      this.fileName = documentNames.join(', ');
    } else {
      this.fileName = '';
    }
    this.dataFile = undefined;
    this.fileTitle = undefined;


  }

  updateEtudiant(): void {
    if (this.studentForm.valid && this.editEtudiant) {
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
        situation_familiale: this.mapFamilialStatus(this.studentForm.value.familialStatus),
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

      // Ajouter l'image mise à jour si elle existe
      if (this.dataFile) {
        formData.append('image', this.dataFile, this.dataFile.name); // Ajoute l'image avec son nom
      }

      this.etudiantService.updateEtudiant(formData).subscribe(
        (response) => {
          console.log('Service response:', response);
          this.toastr.success('Étudiant mis à jour avec succès!', 'Succès');
          this.allEtudiant();
          this.closeEditModal();
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



  saveDevoir() {
    if (this.devoirForm.valid) {

      const selectedClasse = this.classes.find(c => c._id == this.devoirForm.value.classe);
      const selectedMatiere = this.matieres.find(m => m._id == this.devoirForm.value.matiere);
      const selectedEtudiant = this.etudiants.find(m => m._id == this.devoirForm.value.etudiant);

      const devoirData = {
        nom: this.devoirForm.value.nom,
        id_user: this.id_user,
        matiere: {
          _id: selectedMatiere._id,
          nom: selectedMatiere.nom
        },
        classe: {
          _id: selectedClasse._id,
          nom: selectedClasse.nom
        },
        etudiant: {
          _id: selectedEtudiant._id,
          nom: selectedEtudiant.nom
        }
      };


      const formData = new FormData();
      Object.keys(devoirData).forEach(key => {
        if (typeof devoirData[key] == 'object' && devoirData[key] != null) {
          formData.append(key, JSON.stringify(devoirData[key]));
        } else {
          formData.append(key, devoirData[key]);
        }
      });

      // Append the file to the FormData
      if (this.dataFile) {
        formData.append('documents', this.dataFile);
      }

      this.etudiantService.addDevoir(formData).subscribe(
        (response) => {
          // Après avoir sauvegardé avec succès, envoyez un e-mail
          this.etudiantService.sendMail('mimibhaj@gmail.com', 'Nouveau devoir ajouté', 'Un nouveau devoir a été ajouté.').subscribe(
            () => {
              this.toastr.success('Devoir ajouté avec succès et e-mail envoyé', 'Succès');
              this.notificationsService.updateNotifications([...this.notificationsList,{seen:false}])
              this.allDevoirs();
              this.resetDevoirForm();
            },
            (error) => {
              console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
              this.toastr.error('Erreur lors de l\'envoi de l\'e-mail', 'Erreur');
            }
          );
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du devoir:', error);
          this.toastr.error('Erreur lors de l\'ajout du devoir', 'Erreur');
        }
      );
    }
  }



  updateDevoir(): void {
    if (this.devoirForm.valid && this.editDevoir) {
      const selectedClasse = this.classes.find(c => c._id == this.devoirForm.value.classe);
      const selectedMatiere = this.matieres.find(m => m._id == this.devoirForm.value.matiere);
      const selectedEtudiant = this.etudiants.find(e => e._id == this.devoirForm.value.etudiant);

      const updatedDevoirData = {
        _id: this.editDevoir._id,
        nom: this.devoirForm.value.nom,
        id_user: this.id_user,
        classe: {
          _id: selectedClasse._id,
          nom: selectedClasse.nom
        },
        matiere: {
          _id: selectedMatiere._id,
          nom: selectedMatiere.nom
        },
        etudiant: {
          _id: selectedEtudiant._id,
          nom: selectedEtudiant.nom
        }
      };

      const formData = new FormData();
      Object.keys(updatedDevoirData).forEach(key => {
        if (typeof updatedDevoirData[key] === 'object' && updatedDevoirData[key] !== null) {
          formData.append(key, JSON.stringify(updatedDevoirData[key]));
        } else {
          formData.append(key, updatedDevoirData[key]);
        }
      });

      // Ajouter l'image mise à jour si elle existe
      if (this.dataFile) {
        formData.append('image', this.dataFile, this.dataFile.name); // Ajoute l'image avec son nom
      }

      this.etudiantService.updateDevoir(formData).subscribe(
        (response) => {
          this.etudiantService.sendMail('mimibhaj@gmail.com', 'Nouveau devoir ajouté', 'Un nouveau devoir a été ajouté.').subscribe(
            () => {
              console.log('Service response:', response);
              this.toastr.success('Étudiant mis à jour avec succès!', 'Succès');
              this.allDevoirs();
              this.closeEditModal();
            },
            (error) => {
              console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
              this.toastr.error('Erreur lors de l\'envoi de l\'e-mail', 'Erreur');
            }
          );
        }
      )
    } else {
      console.log('Invalid form or missing edit student data.');
      this.toastr.error('Veuillez remplir correctement le formulaire.', 'Erreur de validation');
    }
  }



  resetDevoirForm() {
    this.devoirForm.reset();
  }

  openEditDevoir(devoir: any) {
    this.editDevoir = devoir;
    this.populateDevoirForm(devoir);

    this.openedEditDevoir = true;
  }


  populateDevoirForm(devoir: any): void {
    if (typeof devoir.classe == 'string') {
      devoir.classe = JSON.parse(devoir.classe);
    }

    if (typeof devoir.matiere == 'string') {
      devoir.matiere = JSON.parse(devoir.matiere);
    }
    if (typeof devoir.etudiant == 'string') {
      devoir.etudiant = JSON.parse(devoir.etudiant);
    }
    // Populate the form with the student's data
    this.devoirForm.patchValue({
      nom: devoir.nom,
      matiere: devoir.matiere ? devoir.matiere._id : "",
      createdAt: this.formatDate(devoir.createdAt),
      classe: devoir.classe ? devoir.classe._id : "",
      etudiant: devoir.etudiant ? devoir.etudiant._id : "",
    });
    if (devoir.image && devoir.image.length > 0) {
      const documentNames = devoir.image.map((document: string) => this.getFileNameFromPath(document));
      this.fileName = documentNames.join(', ');
    } else {
      this.fileName = '';
    }
    this.dataFile = undefined;
    this.fileTitle = undefined;


  }

  allDevoirs(): void {
    this.etudiantService.getDevoirs().subscribe(
      (devoirs) => {
        devoirs.forEach(devoirs => {
          if (typeof devoirs.matiere == 'string') {
            devoirs.matiere = JSON.parse(devoirs.matiere);
          }
          if (typeof devoirs.classe == 'string') {
            devoirs.classe = JSON.parse(devoirs.classe);
          }
          if (typeof devoirs.etudiant == 'string') {
            devoirs.etudiant = JSON.parse(devoirs.etudiant);
          }
        });
        this.devoirs = devoirs;
        console.log('devoirs', devoirs)
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours:', error);
      }
    );
  }

  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }

  closeEditModal() {
    this.openedEditEtudiant = false;
    this.resetForm();

  }

  closeEditModalDevoir() {
    this.openedEditDevoir = false;
    this.resetDevoirForm();

  }


  deleteDevoir(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devoir ?')) {
      this.etudiantService.deleteDevoir(id).subscribe(
        () => {
          this.toastr.success('Devoir supprimé avec succès', 'Succès');
          this.allDevoirs();
        },
        (error) => {
          this.toastr.error('Erreur lors de la suppression du ce devoir', 'Erreur');
        }
      );
    }
  }
}
