import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClasseService } from '../services/classes.service';
import { Classe } from '../model/class.model';
import { Etudiant } from '../model/etusiant.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classes: Classe[] = [];
  classForm: FormGroup;
  isFormVisible: boolean = false;
  isEditMode: boolean = false;
  classToUpdate: Classe | null = null;
  expandedClassId: string | null = null;
  selectedStudent: Etudiant | null = null;
  selectedNewClass: string | null = null;
  availableClasses: Classe[] = [];
  changeClassModalRef: NgbModalRef | null = null;
  modalBackdropOpacity: number = 0; // Initialiser l'opacité de la modal backdrop
  levels: string[] = [
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

  constructor(
    private fb: FormBuilder,
    private classService: ClasseService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.classForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      level: ['', Validators.required],
      teachers: [[]],
      students: [[]],
      emploies: [[]]
    });
  }

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    this.classService.getClasses().subscribe(
      data => {
        this.classes = data;
      },
      error => {
        console.error('Erreur lors du chargement des classes', error);
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
    this.classForm.reset();
    this.classToUpdate = null;
    this.isEditMode = false;
  }

  addOrUpdateClass(): void {
    if (this.classForm.valid) {
      const formData = this.classForm.value;

      // Convert null values to empty arrays
      formData.teachers = formData.teachers || [];
      formData.students = formData.students || [];
      formData.emploies = formData.emploies || [];

      if (this.isEditMode && this.classToUpdate) {
        this.classService.updateClasse(formData).subscribe(
          () => {
            this.toastr.success('Classe mise à jour avec succès !');
            this.loadClasses();
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de la mise à jour de la classe', error);
          }
        );
      } else {
        // Remove _id field for new classes
        delete formData._id;
        this.classService.addClasse(formData).subscribe(
          () => {
            this.toastr.success('Classe ajoutée avec succès !');
            this.loadClasses();
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de l\'ajout de la classe', error);
          }
        );
      }
    }
  }

  editClass(classe: Classe, event: Event): void {
    event.stopPropagation();
    this.isEditMode = true;
    this.isFormVisible = true;
    this.classForm.patchValue({
      _id: classe._id,
      name: classe.name,
      level: classe.level,
      teachers: classe.teachers || [],
      students: classe.students || [],
      emploies: classe.emploies || []
    });
    this.classToUpdate = classe;
  }

  deleteClass(classId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette classe ?')) {
      this.classService.deleteClasse(classId).subscribe(
        () => {
          this.toastr.success('Classe supprimée avec succès !');
          this.loadClasses();
        },
        error => {
          console.error('Erreur lors de la suppression de la classe', error);
        }
      );
    }
  }

  toggleDetails(classId: string | undefined): void {
    if (!classId) 
    return;
    if (this.expandedClassId === classId) {
      this.expandedClassId = null;
    } else {
      this.expandedClassId = classId;
    }
  }

  getFileUrl(filePath: string): string {
    const baseUrl = 'http://localhost:3000/uploads/emplois'; // Remplacez par l'URL de votre serveur
    return `${baseUrl}/${filePath}`;
  }

  openChangeClassModal(student: Etudiant, currentClassId: string, content: any): void {
    this.selectedStudent = student;
    this.classService.getClasses().subscribe(
      classes => {
        this.availableClasses = classes.filter(classe => classe._id !== currentClassId);
        this.changeClassModalRef = this.modalService.open(content, { ariaLabelledBy: 'changeClassModalLabel' });
      },
      error => {
        console.error('Erreur lors du chargement des classes', error);
      }
    );
  }

  changeStudentClass(): void {
    if (this.selectedStudent && this.selectedNewClass) {
      this.classService.changeStudentClass(this.selectedStudent._id, this.selectedNewClass).subscribe(
        () => {
          this.toastr.success('Classe de l\'étudiant changée avec succès !');
          this.loadClasses();
          if (this.changeClassModalRef) {
            this.modalBackdropOpacity = 0; // Réinitialiser l'opacité quand la modal se ferme
            this.changeClassModalRef.close();
          }
        },
        error => {
          console.error('Erreur lors du changement de classe de l\'étudiant', error);
        }
      );
    }
  }
}

