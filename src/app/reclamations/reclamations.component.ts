import { Component, OnInit } from '@angular/core';
import { ReclamationsService } from '../service/reclamations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {

  reclamations: any[] = [];

  constructor(private reclamationService: ReclamationsService,private router: Router) { }

  ngOnInit(): void {
    this.reclamationService.getReclamations().subscribe(
      data => {
        this.reclamations = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },
      error => console.error('Error fetching reclamations', error)
    );
  }
  navigateToDashboard() {
    this.router.navigate(['/addReclamation']);
  }
  supp(id: string, event: Event) {
    event.stopPropagation();
    this.reclamationService.deleteReclamation(id).subscribe(() => {
      this.reclamations = this.reclamations.filter(reclamation => reclamation._id !== id);
      window.location.reload();
    }, error => {
      console.error('Error deleting reclamation', error);
    });
  }
  editRepas(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/editReclamation', id]);
  }
  viewReclamation(id: string){
    console.log("ggggggggggggggggggggg")
    this.router.navigate(['/viewreclamation', id]);
  }
}
