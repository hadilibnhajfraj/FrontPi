import { Component, OnInit } from '@angular/core';
import { ReclamationsService } from '../service/reclamations.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editreclamation',
  templateUrl: './editreclamation.component.html',
  styleUrls: ['./editreclamation.component.css']
})
export class EditreclamationComponent implements OnInit {
  reclamation: any = {
    user: '',
    type: '',
    body: '',
    etat: 'non lu'
  };

  constructor(
    private reclamationService: ReclamationsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.reclamationService.getReclamationById(id).subscribe(data => {
      this.reclamation = data;
    });
  }

  onSubmit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.reclamationService.updateReclamation(id, this.reclamation).subscribe(response => {
      console.log('Reclamation updated successfully', response);
      this.router.navigate(['/dashboard']); // Navigate back to the list of reclamations
    }, error => {
      console.error('Error updating reclamation', error);
    });
  }
}
