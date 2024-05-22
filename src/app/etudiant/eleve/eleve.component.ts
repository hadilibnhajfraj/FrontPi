import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-eleve",
  templateUrl: "./eleve.component.html",
  styleUrls: ["./eleve.component.css"],
})
export class EleveComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  activeTab = 1;
  studentForm = this.formBuilder.group({
    firstName: [undefined, Validators.required],
    lastName: [undefined, Validators.required],
    email: [undefined, [Validators.required, Validators.email]],
    niveau: [undefined, [Validators.required]],
    classe: [undefined, [Validators.required]],
  });
  students: any = [
    { id: 1, firstName: "John", lastName: "Doe", age: 18, class: "12th" },
    { id: 2, firstName: "Jane", lastName: "Smith", age: 17, class: "11th" },
    // Ajoutez d'autres élèves selon votre besoin
  ];
  ngOnInit(): void {}

  setActiveTab(tabNumber: number) {
    this.activeTab = tabNumber;
  }
}
