import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.css']
})
export class ObservationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  imagePath: string = "/assets/img/ai.jpg";

  opened: boolean = false;

  observationForm: FormGroup = this.formBuilder.group({
    description: [undefined, Validators.required],
    date: [undefined, Validators.required],
    heure: [undefined, Validators.required],
    repas: [undefined, Validators.required],
    humeur: [undefined, Validators.required],
    sante: [undefined, Validators.required],
    communication: [undefined, Validators.required]
  });

  repasEnumValues: string[] = ['Petit-déjeuner', 'Déjeuner', 'Dîner'];
  humeurEnumValues: string[] = ['Heureux', 'Triste', 'En colère'];
  santeEnumValues: string[] = ['Bonne', 'Moyenne', 'Mauvaise'];
  communicationEnumValues: string[] = ['Communication 1', 'Communication 2', 'Communication 3'];
  activeTab = 1;
  activeAccordion: number = 0;

  studentList:any;

  ngOnInit(): void {
  }

  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
  setActiveAccordion(accordion: number) {
    this.activeAccordion = accordion;
  }

  openModal() {
    this.opened = true;
  }

  closeModal() {
    this.opened = false;
  }
}
