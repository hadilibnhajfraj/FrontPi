import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmploiService } from '../services/emplois.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'gestion-emplois',
  templateUrl: './gestion-emplois.component.html',
  styleUrls: ['./gestion-emplois.component.scss']
})
export class GestionEmploisComponent implements OnInit {

  classes: any[] = [];
  emplois: any[] = [];
  emploiEnseignant: any[] = [];
  emploiParent: any[] = [];
  etudiants: any[] = [];
  enseignantId: string = "6643852347b83c383da43caa";
  parentId: string = "6643857147b83c383da43cac"; 
  enseignantName: string | undefined;
  enseignantNamefile: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private emploiService: EmploiService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadClasses();
    this.loadEmplois();
    this.loadEmploisEnseignant();
    this.loadEmploisParent();
  }

  emploiForm = this.formBuilder.group({
    classe: ['', Validators.required],
  });

  loadClasses(): void {
    this.emploiService.getClasse().subscribe(
      data => {
        this.classes = data;
        console.log('Classes loaded:', this.classes);
      },
      error => {
        console.error('Error loading classes:', error);
      }
    );
  }

  loadEmplois(): void {
    this.emploiService.getEmplois().subscribe(
      data => {
        this.emplois = data;
      },
      error => {
        console.error('Error fetching emploi data', error);
      }
    );
  }

  loadEmploisEnseignant(): void {
    this.emploiService.getEmploisEnseignant(this.enseignantId).subscribe(
      (data: any[]) => {
        data.forEach(item => {
          if (typeof item.enseignant === 'string') {
            item.enseignant = JSON.parse(item.enseignant);
          }
          console.log('Parsed enseignant data', item.enseignant.firstName, item.enseignant.lastName);
          this.enseignantName = `${item.enseignant.firstName} ${item.enseignant.lastName}`;
          this.enseignantNamefile = `${item.enseignant.firstName}_${item.enseignant.lastName}`;
          console.log("fdfdffd" + this.enseignantNamefile);
        });

        this.emploiEnseignant = data;
        console.log('Updated emploiEnseignant', this.emploiEnseignant);
        this.cdr.detectChanges(); // Force change detection
      },
      error => {
        console.error('Error fetching emploi data', error);
      }
    );
  }

  loadEmploisParent(): void {
    this.emploiService.getEmploisByParent(this.parentId).subscribe(
      data => {
        console.log('Data received from backend:', data); // Vérifiez les données reçues ici
        this.emploiParent = data.emplois; // Assurez-vous que cette assignation est correcte
        console.log('Emploi Parent loaded:', this.emploiParent);
        this.cdr.detectChanges(); // Force change detection if needed
      },
      error => {
        console.error('Error loading emploi parent:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.emploiForm.valid) {
      const emploiData = {
        class: this.emploiForm.value.classe,
      };

      this.emploiService.addEmploi(emploiData).subscribe(
        response => {
          console.log(response);
          if (response && response._id) {
            this.toastr.success('Emploi ajouté avec succès.');
            console.log('Emploi ajouté avec succès:', response._id);
            this.router.navigate(['/enploisdetail', response._id]);
          } else {
            this.toastr.error('Erreur lors de l\'ajout de l\'emploi. ID non trouvé.');
            console.error('Erreur lors de l\'ajout de l\'emploi. ID non trouvé:', response);
          }
        },
        error => {
          if (error.error && error.error.message === "Un emploi existe déjà pour cette classe et cette date de début.") {
            this.toastr.error('Vous ne pouvez pas ajouter un emploi pour cette classe cette semaine car il existe déjà.');
          } else {
            this.toastr.error('Erreur lors de l\'ajout de l\'emploi.');
          }
          console.error('Erreur lors de l\'ajout de l\'emploi:', error);
        }
      );
    }
  }

  getFileUrl(filePath: string): string {
    const baseUrl = 'http://localhost:3000/uploads/emplois/';
    return `${baseUrl}/${filePath}`;
  }

  getFileUrlenseignant(filePath: string): string {
    const baseUrl = 'http://localhost:3000/uploads/emplois/';
    return `${baseUrl}${this.enseignantNamefile}/${filePath}`;
  }

  viewEmploiDetails(emploiId: string): void {
    this.router.navigate(['/enploisdetail', emploiId]);
  }
}
