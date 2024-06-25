import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cheque } from '../model/Cheque';
import { ChequeService } from '../service/cheque.service';

@Component({
  selector: 'app-updatecheque',
  templateUrl: './updatecheque.component.html',
  styleUrls: ['./updatecheque.component.css']
})
export class UpdatechequeComponent implements OnInit {

  cheque: Cheque;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chequeService: ChequeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chequeService.getChequeById(id).subscribe(
        (data: Cheque) => {
          this.cheque = data;
        },
        error => {
          this.toastr.error('Erreur lors de la récupération du chèque.');
          console.error(error);
        }
      );
    }
  }

  updateCheque(): void {
    if (this.cheque.reference !== null &&
        this.cheque.proprietaire.trim() !== '' &&
        this.cheque.montant !== null && this.cheque.montant > 0 &&
        this.cheque.echeance !== null ) {

      this.chequeService.updateCheque(this.cheque._id, this.cheque).subscribe(
        response => {
          this.toastr.success('Chèque mis à jour avec succès.');
          this.router.navigate(['/user-profile']); // Redirigez vers la liste des chèques après la mise à jour
        },
        error => {
          this.toastr.error('Erreur lors de la mise à jour du chèque.');
          console.error(error);
        }
      );
    } else {
      this.toastr.warning('Veuillez remplir tous les champs correctement.');
    }
}

retour(): void {
  this.router.navigate(['/user-profile']);
}

}