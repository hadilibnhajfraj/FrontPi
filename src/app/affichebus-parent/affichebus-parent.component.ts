import { Component, OnInit } from '@angular/core';
import { Bus } from '../model/Bus';
import { BusService } from '../service/bus.service';

@Component({
  selector: 'app-affichebus-parent',
  templateUrl: './affichebus-parent.component.html',
  styleUrls: ['./affichebus-parent.component.css']
})
export class AffichebusParentComponent implements OnInit {
  busList: Bus[] = [];

  constructor(private busService: BusService) {}

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

}

