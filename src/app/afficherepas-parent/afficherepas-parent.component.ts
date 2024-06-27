import { Component, OnInit } from '@angular/core';
import { Repas } from '../model/repas/Repas';
import { RepasService } from '../service/repas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficherepas-parent',
  templateUrl: './afficherepas-parent.component.html',
  styleUrls: ['./afficherepas-parent.component.css']
})
export class AfficherepasParentComponent implements OnInit {
  repasList: Repas[] = [];

  constructor(private repasService: RepasService,private router: Router) {}

  ngOnInit(): void {
    this.fetchRepas();
  }
  fetchRepas() {
    this.repasService.getAll().subscribe(repas => {
      this.repasList = repas;
    });
  }
  marquerFavori(repasId: string) {
    this.repasService.marquerRepasFavori(repasId).subscribe(() => {
      this.fetchRepas();
    });
  }
}
