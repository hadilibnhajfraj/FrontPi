import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../service/bus.service';
import { Bus } from '../model/Bus';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {
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

  chauffeurs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private busService: BusService,
  //  private chauffeurService: ChauffeurService
  ) {}

  ngOnInit(): void {
    const busId = this.route.snapshot.paramMap.get('id');
    if (busId) {
      this.busService.getBusById(busId).subscribe(
        (data) => {
          this.bus = data;
        },
        (error) => {
          console.error('Error fetching bus data:', error);
        }
      );

      this.busService.getAllChauffeur().subscribe(
        (data) => {
          this.chauffeurs = data;
        },
        (error) => {
          console.error('Error fetching chauffeurs:', error);
        }
      );
    }
  }


  onSubmit() {
    if (this.bus._id) {
      this.busService.updateBus(this.bus).subscribe(
        (response) => {
          console.log('Bus updated:', response);
          this.router.navigate(['/bus']);
        },
        (error) => {
          console.error('Error updating bus:', error);
        }
      );
    }
  }
}
