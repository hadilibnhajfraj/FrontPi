import { ActivatedRoute } from '@angular/router';
import { OffreService } from '../service/offre.service';
import { Offre } from '../model/Offre';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  offre: Offre;

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService
  ) { }

  ngOnInit(): void {
    const offreId = this.route.snapshot.paramMap.get('id');
    this.offreService.getOffreById(offreId).subscribe(
      data => {
        this.offre = data;
      },
      error => {
        console.error('Erreur lors de la récupération de l\'offre', error);
      }
    );
  }
}