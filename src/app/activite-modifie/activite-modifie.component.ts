import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiviteService } from '../service/activite.service';
import { Activite } from '../model/Activite';

@Component({
  selector: 'app-activite-modifie',
  templateUrl: './activite-modifie.component.html',
  styleUrls: ['./activite-modifie.component.css']
})
export class ActiviteModifieComponent implements OnInit {
  activite: Activite = {
    _id: '',
    nom: '',
    localisation: '',
    date_act: new Date(),
    description: '',
    local: '',
    nblimite: 0,
    galerie: [],
    temperature: ''
  };

  activiteId: string;
  selectedFiles: File[] = [];
  galerie: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private activiteService: ActiviteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activiteId = this.route.snapshot.paramMap.get('id');
    console.log(`Fetching data for activite ID: ${this.activiteId}`);

    this.activiteService.getActiviteById(this.activiteId).subscribe(
      (data: Activite) => {
        if (!data) {
          console.error('Data received is undefined or null');
          return;
        }

        console.log('Data received from API:', data);

        // Convert the date to yyyy-MM-dd format for the input field
        this.activite = {
          ...data,
          date_act: new Date(data.date_act)
        };

        this.galerie = data.galerie || [];

        console.log('Activite initialized with data:', this.activite);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(): void {
    console.log('Submitting form with data:', this.activite);

    this.activiteService.updateActivite(this.activiteId, this.activite).subscribe(
      () => {
        if (this.selectedFiles.length > 0) {
          const formData = new FormData();
          Array.from(this.selectedFiles).forEach(file => {
            formData.append('galerie', file, file.name);
          });

          this.activiteService.uploadImages(this.activiteId, formData).subscribe(
            () => {
              alert('Activité modifieé avec succès');
              this.router.navigate(['/activite']);
            },
            error => {
              console.error('Error uploading images:', error);
            }
          );
        } else {
          this.router.navigate(['/activite']);
        }
      },
      error => {
        console.error('Error updating activite:', error);
      }
    );
  }

  getImageSrc(image: any): string {
    return `data:${image.contentType};base64,${this.arrayBufferToBase64(image.data.data)}`;
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
  }
}
