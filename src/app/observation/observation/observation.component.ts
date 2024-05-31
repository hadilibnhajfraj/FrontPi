import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private etudiantService: EtudiantService, private toastr: ToastrService) { }
  imagePath: string = "/assets/img/ai.jpg";

  id_user = '664677115eb942fdc85aa230';
  opened: boolean = false;

  openedEditObservation: boolean = false;
  editObservation: any;

  observationForm: FormGroup = this.formBuilder.group({
    description: [undefined, Validators.required],
    date: [undefined, Validators.required],
    heure: [undefined, Validators.required],
    repas: [undefined, Validators.required],
    humeur: ['', Validators.required],
    sante: ['', Validators.required],
    communication: ['', Validators.required],
    etudiant: ['', Validators.required]
  });

  repasEnumValues: string[] = ['Petit-déjeuner', 'Déjeuner', 'Dîner'];
  etudiants: any[];
  observations: any[];
  activeTab = 1;
  activeAccordion: string | null = null;

  ngOnInit(): void {
    this.loadEtudiants(); 
    this.loadObservation();
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(
      (data) => {
        this.etudiants = data; 
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }

  saveObservation(): void {
    if (this.observationForm.valid) {
      let selectedEtudiant = this.etudiants.find(c => c._id === this.observationForm.value.etudiant);

      let observationData = {
        description: this.observationForm.value.description,
        date: this.observationForm.value.date,
        heure: this.observationForm.value.heure,
        repas: this.observationForm.value.repas,
        id_user: this.id_user,
        sante: this.observationForm.value.sante,
        humeur: this.observationForm.value.humeur,
        communication: this.observationForm.value.communication,
        etudiant: {
          _id: selectedEtudiant._id,
          nom: selectedEtudiant.nom ,
          prenom: selectedEtudiant.prenom 

        }
      };
      this.etudiantService.addObservation(observationData).subscribe(
        (response) => {
          this.toastr.success('Observation added successfully!', 'Success');
          this.observationForm.reset(); 
          this.loadObservation();
        },
      );
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
    }
  }


  loadObservation(): void {
    this.etudiantService.getObservations().subscribe(
      (data) => {
        this.observations = data; 
      },
    );
  }



  deleteObservation(id: any): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette observation ?')) {
      this.etudiantService.deleteObservation(id).subscribe(
        () => {
          this.toastr.success('Observation supprimé avec succès', 'Succès');
          this.loadObservation();
        },
        (error) => {
          this.toastr.error("Erreur lors de la suppression de l'observation", 'Erreur');
        }
      );
    }
  }

  openEditModal(etudiant: any) {
    this.editObservation = etudiant;
    this.populateForm(etudiant);
    this.openedEditObservation = true;
  }

  populateForm(observation: any): void {
    this.observationForm.patchValue({
      description: observation.description,
      heure: observation.heure,
      date: this.formatDate(observation.date),
      repas: observation.repas,
      humeur: observation.humeur,
      sante: observation.sante,
      communication: observation.communication,
      etudiant: observation.etudiant._id
    });
  }

  updateObservation(): void {
    if (this.observationForm.valid) {
      let selectedEtudiant = this.etudiants.find(c => c._id === this.observationForm.value.etudiant);
      if (selectedEtudiant) { 
        let updatedObservation = {
          _id: this.editObservation._id,
          description: this.observationForm.value.description,
          date: this.observationForm.value.date,
          heure: this.observationForm.value.heure,
          repas: this.observationForm.value.repas,
          id_user: this.id_user,
          sante: this.observationForm.value.sante,
          humeur: this.observationForm.value.humeur,
          communication: this.observationForm.value.communication,
          etudiant: {
            _id: selectedEtudiant._id,
            nom: selectedEtudiant.nom,
            prenom: selectedEtudiant.prenom
          }
        };

        this.etudiantService.updateObservation(updatedObservation).subscribe(
          (response) => {
            this.toastr.success('Observation updated successfully!', 'Success');
            this.observationForm.reset();
            this.loadObservation();
            this.closeEditModal();
          },
          (error) => {
            this.toastr.error('Failed to update observation.', 'Error');
            console.error('Error updating observation:', error);
          }
        );
      } else {
        this.toastr.error('Selected student not found.', 'Error');
      }
    } else {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
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

  closeEditModal() {
    this.openedEditObservation = false;
    this.observationForm.reset(); 
  }

  setActiveTab(tabNumber: number): void {
    this.activeTab = tabNumber;
  }

  toggleAccordion(id: string) {
    this.activeAccordion = this.activeAccordion === id ? null : id;
  }


  openModal() {
    this.opened = true;
  }

  closeModal() {
    this.opened = false;
  }
}
