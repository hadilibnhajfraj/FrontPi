import { Component, OnInit } from '@angular/core';
import { Bus } from '../model/Bus';
import { BusService } from '../service/bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busaffiche',
  templateUrl: './busaffiche.component.html',
  styleUrls: ['./busaffiche.component.css']
})
export class BusafficheComponent implements OnInit {
  busList: Bus[] = [];

  constructor(private busService: BusService,private router: Router) {}

  ngOnInit(): void {
    this.busService.getAllBus().subscribe(
      (data: Bus[]) => {
        this.busList = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching bus data:', error);
      }
    );
  }

  navigateToDashboard() {
    this.router.navigate(['/ajouterBus']);
  }
  supp(id: string) {
    this.busService.deleteBus(id).subscribe(
      response => {

        console.log('Repas supprimé avec succès:', response);
        // Mettez à jour votre liste de repas localement après la suppression
        this.busList = this.busList.filter(bus => bus._id !== id);
        window.location.reload();
        alert('Repas supprimé avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression du repas:', error);
      }
    );
  }
  edit(id: string) {
    this.router.navigate(['/modiferBus', id]);
  }
}


