import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmploiService } from '../services/emplois.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-emploi-detail',
  templateUrl: './emploi-detail.component.html',
  styleUrls: ['./emploi-detail.component.scss']
})
export class EmploiDetailComponent implements OnInit {
  emploi: any;
  daysWithDates: { day: string, date: Date }[] = [];
  hours = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];
  showExtendModal = false;
  additionalWeeks: number = 0;
  newSeance: any = {
    id: '',
    num_seance: '',
    emploi: '',
    heure_debut: '',
    heure_fin: '',
    matiere: null,
    enseignant: null,
    salle: null,
    class: '',
    date: null
  };

  matieres: any[] = [];
  enseignants: any[] = [];
  salles: any[] = [];
  selectedEnseignantId: string = '';
  selectedSalleId: string = '';
  seanceForm: FormGroup;

  private modalRef: NgbModalRef | null = null;

  constructor(private route: ActivatedRoute, private emploiService: EmploiService, private modalService: NgbModal,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadEmploi();
    this.loadDropdownData();
    this.seanceForm = this.fb.group({
      matiere: ['', Validators.required],
      enseignant: ['', Validators.required],
      salle: ['', Validators.required]
    });
  }

  loadEmploi(): void {
    const emploiId = this.route.snapshot.paramMap.get('id');
    this.emploiService.getEmploiById(emploiId).subscribe(
      (data) => {
        this.emploi = data;
        this.populateDaysWithDates(); // Mettre à jour les jours avec dates après chargement de l'emploi
      },
      (error) => {
        console.error('Error loading emploi:', error);
      }
    );
  }

  isSunday(date: Date): boolean {
    const dayOfWeek = date.getDay(); // Récupère le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.)
    return dayOfWeek === 0; // Retourne true si c'est un dimanche
  }

  populateDaysWithDates(): void {
    this.daysWithDates = [];
    const currentDate = new Date(this.emploi.date_debut);
    const endDate = new Date(this.emploi.date_fin);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.toLocaleDateString('fr-FR', { weekday: 'long' });

      if (!this.isSunday(currentDate) && !this.daysWithDates.some(d => d.date.toDateString() === currentDate.toDateString())) {
        this.daysWithDates.push({ day: dayOfWeek, date: new Date(currentDate) });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  loadDropdownData(): void {
    this.loadMatieres();
  }

  loadMatieres(): void {
    this.emploiService.getMatieres().subscribe(
      (data) => {
        this.matieres = data;
      },
      (error) => {
        console.error('Error loading matieres:', error);
      }
    );
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getSeancesForDayAndHour(date: Date, hour: string): any[] {
    const [startHour, endHour] = hour.split(' - ').map(h => parseInt(h.replace(':00', ''), 10));

    return this.emploi.seances.filter((seance: any) => {
      const seanceDate = new Date(seance.date);
      return seanceDate.toDateString() === date.toDateString() &&
        seance.heure_debut >= startHour && seance.heure_fin <= endHour;
    });
  }



  loadAvailableOptions(date: string, num_seance: number): void {
    this.emploiService.getAvailableOptions(date, num_seance).subscribe(
      (data) => {
        this.salles = data.availableSalles;
        this.enseignants = data.availableEnseignants;
      },
      (error) => {
        console.error('Error loading available options:', error);
      }
    );
  }

  openAddSeanceModal(day: { day: string, date: Date }, hour: string, content: any): void {
    if (day && day.date) {
      this.newSeance.day = day.day;
      this.newSeance.hour = hour;
      this.newSeance.date = day.date.toISOString();

      const num_seance = this.hours.indexOf(hour) + 1;
      console.log("Selected date: " + this.newSeance.date);
      console.log("Selected num_seance: " + num_seance);

      this.resetSelections(); // Reset selections before loading available options
      this.loadAvailableOptions(this.newSeance.date, num_seance);

      this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
      this.modalRef.result.then(
        (result) => {
          if (result === 'Save') {
            this.addSeance();
            window.location.reload();
          }
        },
        (reason) => {
          console.log('Modal dismissed with:', this.getDismissReason(reason));
        }
      );
    } else {
      console.error('Error: day or day.date is undefined or null.');
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onMatiereChange(): void {
    if (this.newSeance.matiere) {
      console.log('Selected Matiere:', this.newSeance.matiere.nom);
    } else {
      console.log('No Matiere selected');
    }
  }

  addSeance(): void {
    if (this.seanceForm.invalid) {
      return;
    }

    const emploiId = this.route.snapshot.paramMap.get('id');
    const classId = this.emploi.class._id;
    const seanceData = {
      num_seance: this.hours.indexOf(this.newSeance.hour) + 1,
      matiere: this.seanceForm.value.matiere._id,
      salle: this.seanceForm.value.salle,
      enseignant: this.seanceForm.value.enseignant,
      date: this.newSeance.date
    };
    console.log('Reached addSeance()');
    console.dir(seanceData);

    this.emploiService.addSeance(emploiId, classId, seanceData).subscribe(
      (response) => {
        this.emploi = null;
        this.daysWithDates = [];
        this.loadEmploi();

        this.seanceForm.reset(); // Reset form after adding seance
      },
      (error) => {
        console.error('Error adding seance:', error);
      }
    );
  }

  resetSelections(): void {
    this.selectedEnseignantId = '';
    this.selectedSalleId = '';
    this.salles = [];
    this.enseignants = [];
  }

  openEditSeanceModal(seanceId: string, content: any): void {
    console.log('Trying to open modal for seanceId:', seanceId);

    this.emploiService.getSeanceById(seanceId).subscribe(
      (seanceData) => {
        console.log('Received seance data:', seanceData);

        // Load available options first
        const num_seance = seanceData.num_seance; // Assuming seanceData.num_seance is the correct number

        console.log("Numéro de séance:", num_seance);

        this.loadAvailableOptions(seanceData.date, num_seance);
        console.log("salles : " + this.salles);

        // Ensure proper data mapping after loading options
        this.newSeance = {
          id: seanceData._id,
          num_seance: seanceData.num_seance,
          emploi: seanceData.emploie,
          heure_debut: seanceData.heure_debut,
          heure_fin: seanceData.heure_fin,
          matiere: this.matieres.find(m => m._id === seanceData.matiere), // Trouver la matière par son ID
          enseignant: this.enseignants.find(e => e._id === seanceData.enseignant?._id),
          salle: this.salles.find(s => s._id === seanceData.salle?._id),
          class: seanceData.class,
          date: seanceData.date
        };

        console.log('Mapped newSeance:', this.newSeance);

        this.selectedEnseignantId = seanceData.enseignant?._id || '';
        this.selectedSalleId = seanceData.salle?.id || '';
        console.log ("selectedEnseignantId " + this.selectedEnseignantId)
        console.log ("selectedSalleId " + this.selectedSalleId)

        this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        this.modalRef.result.then(
          (result) => {
            console.log('Modal closed with result:', result);
            if (result === 'Save') {
              this.updateSeance(seanceId);
            }
          },
          (reason) => {
            console.log('Modal dismissed with reason:', this.getDismissReason(reason));
          }
        );
      },
      (error) => {
        console.error('Error loading seance:', error);
      }
    );
  }



  updateSeance(seanceId: string): void {
    console.log('Selected salle ID:', this.selectedSalleId);
    console.log('Selected enseignant ID:', this.selectedEnseignantId);
    const seanceData = {
      num_seance: this.newSeance.num_seance,
      matiere: this.newSeance.matiere._id,
      salle: this.selectedSalleId,
      enseignant: this.selectedEnseignantId,
      date: this.newSeance.date
    };

    console.log('Updating seance with data:');
    console.dir(seanceData);

    this.emploiService.updateSeance(seanceId, seanceData).subscribe(
      (response) => {
        console.log('Seance updated successfully. Response:', response);

        this.emploi = null;
        this.daysWithDates = [];
        this.loadEmploi();

        this.newSeance.matiere = null;
        this.resetSelections(); // Reset
      },
      (error) => {
        console.error('Error updating seance:', error);
      }
    );
  }
  openConfirmationModal(seance: any, content: any): void {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        if (result === 'Confirm') {
          this.deleteSeance(seance);
        }
      },
      (reason) => {
        console.log('Modal dismissed with:', this.getDismissReason(reason));
      }
    );
  }


  deleteSeance(seance: any): void {
    this.emploiService.deleteSeance(seance._id).subscribe(
      (response) => {
        this.loadEmploi(); // Recharger l'emploi pour refléter les changements
      },
      (error) => {
        console.error('Error deleting seance:', error);
      }
    );
  }

  // In your component
  openconfirmAnnulationModal(seance: any, content: any): void {
    console.log('openconfirmAnnulationModal called with seance:', seance);
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        console.log('Modal result:', result);
        if (result === 'Confirm') {
          this.annulerSeance(seance);
        }
      },
      (reason) => {
        console.log('Modal dismissed with:', this.getDismissReason(reason));
      }
    );
  }

  annulerSeance(seance: any): void {
    console.log('annulerSeance called with seance:', seance);
    this.emploiService.cancelSeance(seance._id).subscribe(
      (response) => {
        console.log('Seance canceled successfully:', response);
        this.loadEmploi(); // Recharger l'emploi pour refléter les changements
      },
      (error) => {
        console.error('Error deleting seance:', error);
      }
    );
  }
  openSaveModal(emploi: any, content: any): void {
    console.log('openSaveModal called with emploi:', emploi);
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        console.log('Modal result:', result);
        if (result === 'Confirm') {
          this.saveEmploe(emploi);
        }
      },
      (reason) => {
        console.log('Modal dismissed with:', this.getDismissReason(reason));
      }
    );
  }

  saveEmploe(emploi: any): void {
    console.log('annulerSeance called with seance:', emploi);
    this.emploiService.saveEmploi(emploi._id).subscribe(
      (response) => {
        console.log('emploie saved successfully:', response);
        this.loadEmploi(); // Recharger l'emploi pour refléter les changements
      },
      (error) => {
        console.error('Error deleting seance:', error);
      }
    );
  }
  openExtendModal(): void {
    this.showExtendModal = true;
  }

  closeExtendModal(): void {
    this.showExtendModal = false;
  }



  extendEmploi(additionalWeeks: number): void {
    const emploiId = this.route.snapshot.paramMap.get('id');

    // Calculer la date de début de la nouvelle semaine à ajouter
    const lastWeekEndDate = new Date(this.emploi.date_fin);
    const nextWeekStartDate = new Date(lastWeekEndDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 1); // Début de la semaine suivante

    // Calculer la date de fin de la nouvelle semaine à ajouter
    const additionalWeeksEndDate = new Date(nextWeekStartDate);
    additionalWeeksEndDate.setDate(additionalWeeksEndDate.getDate() + (7 * additionalWeeks)); // Fin de la dernière semaine ajoutée

    // Préparer les nouvelles semaines vides à ajouter
    const newWeeks = [];
    let currentDate = new Date(nextWeekStartDate);
    while (currentDate <= additionalWeeksEndDate) {
      newWeeks.push({
        date: new Date(currentDate),
        seances: [] // Initialiser avec un tableau vide de séances
      });
      currentDate.setDate(currentDate.getDate() + 7); // Passer à la semaine suivante
    }

    // Ajouter les nouvelles semaines à l'emploi existant
    this.emploiService.extendEmploi(emploiId, additionalWeeks).subscribe(
      (response) => {
        this.loadEmploi(); // Recharger l'emploi pour refléter les changements
        this.closeExtendModal(); // Fermer la modal après extension
      },
      (error) => {
        console.error('Error extending emploi:', error);
      }
    );
  }

}
