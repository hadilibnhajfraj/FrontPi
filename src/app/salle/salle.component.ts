import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalleService } from '../services/salle.service';
import { Salle } from '../model/salle.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {
  salles: Salle[] = [];
  salleForm: FormGroup;
  isFormVisible: boolean = false; // Initialiser à false pour que le formulaire soit fermé au chargement
  isEditMode: boolean = false;
  salleToUpdate: Salle | null = null;
  levels: string[] = ['Rez-de-chaussée', '1er étage', '2ème étage', '3ème étage'];
  selectedNewSalle: string | null = null;
  changeSalleModalRef: NgbModalRef | null = null;

  constructor(
    private fb: FormBuilder,
    private salleService: SalleService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.salleForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSalles();
  }

  loadSalles(): void {
    this.salleService.getSalles().subscribe(
      data => {
        this.salles = data;
      },
      error => {
        console.error('Erreur lors du chargement des salles', error);
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
    this.salleForm.reset();
    this.salleToUpdate = null;
    this.isEditMode = false;
  }

  addOrUpdateSalle(): void {
    if (this.salleForm.valid) {
      const formData = this.salleForm.value;

      if (this.isEditMode && this.salleToUpdate) {
        this.salleService.updateSalle(formData).subscribe(
          () => {
            this.toastr.success('Salle mise à jour avec succès !');
            this.loadSalles();
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de la mise à jour de la salle', error);
          }
        );
      } else {
        delete formData._id;
        this.salleService.addSalle(formData).subscribe(
          () => {
            this.toastr.success('Salle ajoutée avec succès !');
            this.loadSalles();
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de l\'ajout de la salle', error);
          }
        );
      }
    }
  }

  editSalle(salle: Salle, event: Event): void {
    event.stopPropagation();
    this.isEditMode = true;
    this.isFormVisible = true; // Assurez-vous que le formulaire est ouvert en mode édition
    this.salleForm.patchValue({
      _id: salle._id,
      name: salle.name,
      capacity: salle.capacity,
      location: salle.location
    });
    this.salleToUpdate = salle;
  }

  deleteSalle(salleId: string, event: Event): void {
    event.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      this.salleService.deleteSalle(salleId).subscribe(
        () => {
          this.toastr.success('Salle supprimée avec succès !');
          this.loadSalles();
        },
        error => {
          console.error('Erreur lors de la suppression de la salle', error);
        }
      );
    }
  }
}
