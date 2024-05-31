import { Component, OnInit } from '@angular/core';
import { Bus } from '../model/Bus';
import { Router } from '@angular/router';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

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


