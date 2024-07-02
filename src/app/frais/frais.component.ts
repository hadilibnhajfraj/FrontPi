import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Frais } from '../model/Frais';
import { FraisService } from '../service/frais.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-frais',
  templateUrl: './frais.component.html',
  styleUrls: ['./frais.component.css']
})
export class FraisComponent implements OnInit {

  frais: Frais = { nom: '', prix: null };

  constructor(
    private route: ActivatedRoute,
    private fraisService: FraisService,
    private router: Router,
    private toastr: ToastrService // Injection du service Toastr
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fraisService.get(id).subscribe(data => {
        this.frais = data;
      }, error => {
        this.toastr.error('Une erreur s\'est produite lors du chargement du frais.');
      });
    }
  }

  updateFrais(): void {
    if (this.frais.nom.trim() !== '' && this.frais.prix !== null && this.frais.prix > 0) {
      this.fraisService.update(this.frais).subscribe(() => {
        this.toastr.success('Frais mis à jour avec succès!');
        this.router.navigate(['/maps']);
      }, error => {
        this.toastr.error('Une erreur s\'est produite lors de la mise à jour du frais.');
      });
    } else {
      this.toastr.warning('Veuillez saisir un prix valide.');
    }
  }

  retour(): void {
    this.router.navigate(['/maps']);
  }
}
