import { Component, OnInit } from '@angular/core';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';
import { Chauffeur } from '../model/Chauffeur';

@Component({
  selector: 'app-chauffeur',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.css']
})
export class ChauffeurComponent implements OnInit {

  chauffeur: Chauffeur = {
    nom: '',
    prenom: '',
    cin: '',
    email: '',
    disponibilite: true,
    _id: ''
  };

  constructor(
    private chauffeurService: BusService,
    private router: Router
  ) {}
  ngOnInit(): void {

  }
  onSubmit() {
    delete this.chauffeur._id;
    this.chauffeurService.addChauffeur(this.chauffeur).subscribe(
      (response) => {
        console.log('Chauffeur added:', response);
        this.router.navigate(['/chauffeur']);  // Adjust the route as needed
      },
      (error) => {
        console.error('Error adding chauffeur:', error);
      }
    );
  }
}
