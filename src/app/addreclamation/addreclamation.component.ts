import { Component, OnInit } from '@angular/core';
import { ReclamationsService } from '../service/reclamations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addreclamation',
  templateUrl: './addreclamation.component.html',
  styleUrls: ['./addreclamation.component.css']
})
export class AddreclamationComponent implements OnInit {

  reclamation = {
    user: '',
    type: '',
    body: ''
  };


  constructor(private reclamationService: ReclamationsService,  private router: Router) { }
  ngOnInit(): void {

  }
  onSubmit() {
    this.reclamationService.addReclamation(this.reclamation).subscribe(response => {
      console.log('Reclamation added successfully', response);
      alert('Reclamation ajouté avec succès');

      // Rediriger vers le tableau de bord
      this.router.navigate(['/dashboard']);

    }, error => {
      console.error('Error adding reclamation', error);
    });
  }
}
