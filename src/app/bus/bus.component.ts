import { Component, OnInit } from '@angular/core';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';
import { Bus } from '../model/Bus';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.css']
})
export class BusComponent implements OnInit {
  bus: Bus = {
    _id: '',
    itineraire: {
      depart: '',
      arrivee: ''
    },
    horaire: '',
    matricule: '',
    chauffeur: {
      _id: '',
      nom: '',
      prenom: '',
      cin: '',
      email: ''
    }
  };

  stations: string[] = [
    "Centre Ville",
    "Aouina",
    "Le Kram",
    "Omran",
    "La goulette",
    "La marsa",
    "Lac 1",
    "Lac 2",
  ];

  chauffeurs: any[] = []; // Array to hold chauffeurs

  constructor(
    private busService: BusService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.busService.getAllChauffeur().subscribe(
      (data) => {
        this.chauffeurs = data;
      },
      (error) => {
        console.error('Error fetching chauffeurs:', error);
      }
    );
  }

  onSubmit() {
    delete this.bus._id;
    this.busService.addBus(this.bus).subscribe(
      (response) => {
        console.log('Bus added:', response);
        this.router.navigate(['/bus']);  // Adjust the route as needed
      },
      (error) => {
        console.error('Error adding bus:', error);
      }
    );
  }
}
