import { Component, OnInit } from "@angular/core";
import { Activite } from "../model/Activite";
import { Router } from "@angular/router";
import { ActiviteService } from "../service/activite.service";
import * as base64js from 'base64-js';
import * as bootstrap from 'bootstrap';
@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"],
})
export class MapsComponent implements OnInit {
  activite: Activite[] = [];
  selectedGallery: any[] = [];

  constructor(private activiteService: ActiviteService, private router: Router) {}

  ngOnInit(): void {
    this.activiteService.getAllActivite().subscribe((data: Activite[]) => {
      this.activite = data;
      console.log(data);
    });
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  supp(id: string) {

  }

  editRepas(id: string) {
    this.router.navigate(['/modifRepas', id]);
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    const binary = base64js.fromByteArray(bytes);
    return binary;
  }

  getImageSrc(image: { data: any, contentType: string }): string {
    const base64String = this.arrayBufferToBase64(image.data.data);
    return `data:${image.contentType};base64,${base64String}`;
  }

  openGallery(galerie: any[]) {
    this.selectedGallery = galerie;
    const modalElement = document.getElementById('galleryModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Manually activate the first carousel item
      const carouselElement = document.getElementById('carouselGallery');
      if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement);

        // Activate the first item
        carouselElement.querySelectorAll('.carousel-item').forEach((item, index) => {
          if (index === 0) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        // Initialize the carousel
        carouselElement.dispatchEvent(new Event('load'));
      }
    }
  }
}
