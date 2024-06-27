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

  constructor(private formBuilder: FormBuilder, private coursService: CoursService, private toastr: ToastrService) { }
  currentDate=this.formatDate(new Date())
  imagePath: string = "/assets/img/ai.jpg";
  id_user = '664677115eb942fdc85aa230';
  fileName: string = "";
  filePreview: string | ArrayBuffer | null = null;
  activeTab = 1;
  coursData: any[] = [];
  classes: any[] = [];
  matieres: any[] = [];
  exercises: any[] = [];
  allCoursData: any[] = [];

  opened: boolean = false;
  openedEditCours: boolean = false;
  openedEditExercise: boolean = false;

  dataFile: any | undefined;
  fileTitle: string | undefined;
  editCours: any;
  editExercise: any;
  searchTerm: string = '';



  leconForm: FormGroup = this.formBuilder.group({
    nom: ['', Validators.required],
    descriptionContenu: ['', Validators.required],
    planCours: ['', Validators.required],
    horaire: ['', Validators.required],
    classe: ['', Validators.required],
    matiere: ['', Validators.required],
    file: [null],
  });

  exerciceForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
    dateLimite: ['', Validators.required],
    documents: [''],
    typeExercice: ['', Validators.required],
    cours: ['', Validators.required],
  });

  ngOnInit(): void {
    this.allCours();
    this.loadClasses();
    this.loadMatieres();
    this.loadExercice();
  }

  searchCourses() {
    const searchTermLower = this.searchTerm.toLowerCase().trim();
    if (!searchTermLower) {
      this.coursData = this.allCoursData;
      return;
    }
    this.coursData = this.allCoursData.filter(cours =>
      cours.nom.toLowerCase().includes(searchTermLower)
    );
  }




  loadClasses(): void {
    this.coursService.getClasse().subscribe(
      (data) => {
        this.classes = data;

      },
      (error) => {
        console.error('Erreur lors de la récupération des classes:', error);
      }
    );
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

  allCours(): void {
    this.coursService.getCours().subscribe(
      (cours) => {
        cours.forEach(cours => {
          if (typeof cours.matiere == 'string') {
            cours.matiere = JSON.parse(cours.matiere);
          }
          if (typeof cours.classe == 'string') {
            cours.classe = JSON.parse(cours.classe);
          }
        });
        this.coursData = cours;
        this.allCoursData = cours; 

      },
      (error) => {
        console.error('Erreur lors de la récupération des cours:', error);
      }
    );
  }


  onSubmit() {
    if (this.leconForm.valid) {

      const selectedClasse = this.classes.find(c => c._id === this.leconForm.value.classe);
      const selectedMatiere = this.matieres.find(m => m._id === this.leconForm.value.matiere);

      const coursData = {
        nom: this.leconForm.value.nom,
        horaire: this.leconForm.value.horaire,
        descriptionContenu: this.leconForm.value.descriptionContenu,
        planCours: this.leconForm.value.planCours,
        id_user: this.id_user,
        matiere: {
          _id: selectedMatiere._id,
          nom: selectedMatiere.nom
        },
        classe: {
          _id: selectedClasse._id,
          nom: selectedClasse.nom
        }
      };


      const formData = new FormData();
      Object.keys(coursData).forEach(key => {
        if (typeof coursData[key] == 'object' && coursData[key] != null) {
          formData.append(key, JSON.stringify(coursData[key]));
        } else {
          formData.append(key, coursData[key]);
        }
      });

      // Append the file to the FormData
      if (this.dataFile) {
        formData.append('documents', this.dataFile);
      }

      this.coursService.addCours(formData).subscribe(
        (response) => {
          this.toastr.success('Cours ajouté avec succès', 'Succès');
          this.allCours();
          this.resetForm();
        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout du cours', 'Erreur');
        }
      );
    }
  }


  saveExercice() {
    if (this.exerciceForm?.valid) {
      const selectedCours = this.coursData.find(c => c._id == this.exerciceForm.value.cours);
      const exerciceData = {
        description: this.exerciceForm.value.description,
        dateLimite: this.exerciceForm.value.dateLimite,
        typeExercice: this.exerciceForm.value.typeExercice,
        id_user: this.id_user,
        cours: {
          _id: selectedCours._id,
          nom: selectedCours.nom
        },
      };
      const formData = new FormData();
      Object.keys(exerciceData).forEach(key => {
        if (typeof exerciceData[key] == 'object' && exerciceData[key] !== null) {
          formData.append(key, JSON.stringify(exerciceData[key]));
        } else {
          formData.append(key, exerciceData[key]);
        }
      });

      if (this.dataFile) {
        formData.append('documents', this.dataFile);
      }

      this.coursService.addExercice(formData).subscribe(
        (response) => {
          this.toastr.success('Exercice ajouté avec succès', 'Succès');
          this.loadExercice();
          this.exerciceForm.reset();
          this.fileName = '';
          this.filePreview = null;

        },
        (error) => {
          this.toastr.error('Erreur lors de l\'ajout de l\'exercice', 'Erreur');
        }
      );
    }
  }


  loadExercice(): void {
    this.coursService.getExercice().subscribe(
      (ex) => {
        ex.forEach(e => {

          if (typeof e.cours == 'string') {
            e.cours = JSON.parse(e.cours);
          }
        });
        this.exercises = ex;
        console.log('exercices', this.exercises)

      },
      (error) => {
        console.error('Erreur lors de la récupération des exercices:', error);
      }
    );
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
  openEditExercice(exercise: any) {
    this.editExercise = exercise;
    this.exerxiseForm(exercise);
  this.openedEditExercise = true;
}

  private populateForm(cours: any): void {
    if (typeof cours.matiere === 'string') {
      cours.matiere = JSON.parse(cours.matiere);
    }
    if (typeof cours.classe === 'string') {
      cours.classe = JSON.parse(cours.classe);
    }
    this.leconForm.patchValue({
      nom: cours.nom,
      horaire: cours.horaire,
      descriptionContenu: cours.descriptionContenu,
      planCours: cours.planCours,
      classe: cours.classe ? cours.classe._id : '',
      matiere: cours.matiere ? cours.matiere._id : ''
    });

    if (cours.documents && cours.documents.length > 0) {
      const documentNames = cours.documents.map((document: string) => this.getFileNameFromPath(document));
      this.fileName = documentNames.join(', ');
    } else {
      this.fileName = '';
    }
    this.dataFile = undefined;
    this.fileTitle = undefined;

  }

  private exerxiseForm(exercise: any): void {
    if (typeof exercise.cours === 'string') {
      exercise.cours = JSON.parse(exercise.cours);
    }
    this.exerciceForm.patchValue({
      description: exercise.description,
      dateLimite: this.formatDate(exercise.dateLimite),
      typeExercice: exercise.typeExercice,
      cours: exercise.cours ? exercise.cours._id : '',
    });

    if (exercise.documents && exercise.documents.length > 0) {
      const documentNames = exercise.documents.map((document: string) => this.getFileNameFromPath(document));
      this.fileName = documentNames.join(', ');
    } else {
      this.fileName = '';
    }
    this.dataFile = undefined;
    this.fileTitle = undefined;

  }

  updateCours() {
    if (this.leconForm.valid && this.editCours) {
      const selectedClasse = this.classes.find(c => c._id === this.leconForm.value.classe);
      const selectedMatiere = this.matieres.find(m => m._id === this.leconForm.value.matiere);

      const updatedData = {
        nom: this.leconForm.value.nom,
        horaire: this.leconForm.value.horaire,
        descriptionContenu: this.leconForm.value.descriptionContenu,
        planCours: this.leconForm.value.planCours,
        documents: this.dataFile || this.editCours.documents,
        id_user: this.id_user,
        matiere: {
          _id: selectedMatiere._id,
          nom: selectedMatiere.nom
        },
        classe: {
          _id: selectedClasse._id,
          nom: selectedClasse.nom
        },
        _id: this.editCours._id
      };


      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key == 'matiere' || key == 'classe') {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else {
          formData.append(key, updatedData[key]);
        }
      });


      this.coursService.updateCours(formData).subscribe(
        (response) => {
          this.toastr.success('Cours mis à jour avec succès', 'Succès');
          this.allCours();
          this.closeEditModal();
          this.resetForm();
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour du cours', 'Erreur');
        }
      );
    }
  }


  updateExercise() {
    if (this.exerciceForm.valid && this.editExercise) {
      const selectedCours = this.coursData.find(c => c._id === this.exerciceForm.value.cours);
      const updatedData = {
        description: this.exerciceForm.value.description,
        dateLimite: this.exerciceForm.value.dateLimite,
        typeExercice: this.exerciceForm.value.typeExercice,
        id_user: this.id_user,
        cours: {
          _id: selectedCours._id,
          nom: selectedCours.nom
        },
        _id: this.editExercise._id
      };

      const formData = new FormData();
      Object.keys(updatedData).forEach(key => {
        if (key === 'cours') {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else {
          formData.append(key, updatedData[key]);
        }
      });
      // Ajouter l'image mise à jour si elle existe
      if (this.dataFile) {
        formData.append('documents', this.dataFile, this.dataFile.name); // Ajoute l'image avec son nom
      }
      this.coursService.updateExercice(formData).subscribe(
        (response) => {
          this.toastr.success('Exercice mis à jour avec succès', 'Succès');
          this.loadExercice();
          this.closeEditExercise();
          this.exerciceForm.reset();
          this.fileName = '';
          this.filePreview = null;
        },
        (error) => {
          this.toastr.error('Erreur lors de la mise à jour de l\'exercice', 'Erreur');
        }
      );
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

  deleteExercise(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce exercise ?')) {
      this.coursService.deleteExercice(id).subscribe(
        () => {
          this.toastr.success('Exercice supprimé avec succès', 'Succès');
          this.loadExercice();
        },
        (error) => {
          this.toastr.error("Erreur lors de la suppression du l'exercise", 'Erreur');
        }
      );
    }
  }

  closeModal(): void {
    this.opened = false;
    this.resetForm();
  }


  closeEditModal() {
    this.openedEditCours = false;
    this.resetForm();

  }

  closeEditExercise() {
    this.openedEditExercise = false;
    this.exerciceForm.reset();

  }

  checkDeadlinePassed(dateLimite: string): boolean {
    // Convertir la date limite en objet Date
    const exerciseDeadline = new Date(dateLimite);

    // Obtenir la date actuelle
    const currentDate = new Date();

    // Logs pour vérifier les valeurs
    console.log('Date limite de l\'exercice :', exerciseDeadline);
    console.log('Date actuelle :', currentDate);

    // Comparer les dates
    const isPassed = currentDate.getTime() > exerciseDeadline.getTime();

    console.log('Date limite dépassée ?', isPassed);

    return isPassed;
  }




}
