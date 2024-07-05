import { Component, OnInit, ViewChild } from '@angular/core';
import { ReclamationsService } from '../service/reclamations.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viewreclamation',
  templateUrl: './viewreclamation.component.html',
  styleUrls: ['./viewreclamation.component.css']
})
export class ViewreclamationComponent implements OnInit {

  reclamation: any = {
    user: '',
    type: '',
    body: '',
    etat: '',
    responses: []
  };

  newResponse: any = {
    reclamation: '',
    sender: '',
    body: ''
  };

  editResponse: any = {
    _id: '',
    body: ''
  };

  modalRef: NgbModalRef;
  senderValid = true;

  @ViewChild('editResponseContent') editResponseContent: any;

  constructor(
    private reclamationService: ReclamationsService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadReclamation(id);
    this.loadResponses(id);
    setInterval(() => this.loadResponses(id), 1000);
  }

  loadReclamation(id: string): void {
    this.reclamationService.getReclamationById(id).subscribe(
      data => {
        this.reclamation = data;
        this.sortResponses();
        if (this.reclamation.etat === 'non lu') {
          this.reclamationService.getReclamationandlire(id).subscribe(
            response => {
              this.reclamation = response;
              this.sortResponses();
            },
            error => console.error('Error fetching reclamation', error)
          );
        }
      },
      error => console.error('Error fetching reclamation', error)
    );
  }

  loadResponses(id: string): void {
    this.reclamationService.getAllResponsesForReclamation(id).subscribe(
      responses => {
        this.reclamation.responses = responses;
        this.sortResponses();
      },
      error => console.error('Error fetching responses', error)
    );
  }

  sortResponses(): void {
    this.reclamation.responses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        console.log(`Modal closed with: ${result}`);
      },
      (reason) => {
        console.log(`Modal dismissed with: ${reason}`);
      }
    );
  }

  isValidSender(sender: string): boolean {
    return !!sender; // Example validation logic
  }

  addResponse(): void {
    if (!this.isValidSender(this.newResponse.sender)) {
      this.senderValid = false;
      setTimeout(() => {
        this.senderValid = true;
      }, 3000); // Hide alert after 3 seconds
      return;
    }

    this.newResponse.reclamation = this.reclamation._id;
    this.reclamationService.addResponce(this.newResponse).subscribe(
      () => {
        this.modalRef.close();
        this.loadResponses(this.reclamation._id);
        this.newResponse.sender = '';
        this.newResponse.body = '';
      },
      error => {
        console.error('Error adding response', error);
        if (error.error.error === 'Invalid sender') {
          this.senderValid = false;
          setTimeout(() => {
            this.senderValid = true;
          }, 3000); // Hide alert after 3 seconds
        }
      }
    );
  }

  openEditModal(responseId: string): void {
    this.reclamationService.getResponce(responseId).subscribe(
      response => {
        this.editResponse = response;
        this.modalRef = this.modalService.open(this.editResponseContent, { ariaLabelledBy: 'modal-edit-response-title' });
      },
      error => console.error('Error fetching response for editing', error)
    );
  }

  updateResponse(): void {
    this.reclamationService.updateResponce(this.editResponse._id, { body: this.editResponse.body }).subscribe(
      () => {
        this.modalRef.close();
        this.loadResponses(this.reclamation._id);
        this.editResponse.body = '';
      },
      error => console.error('Error updating response', error)
    );
  }
  supp(id: string) {
    this.reclamationService.deleteResponce(id).subscribe(() => {
      this.newResponse = this.newResponse.filter(response => response._id !== id);
      window.location.reload();
    }, error => {
      console.error('Error deleting reclamation', error);
    });
  }
}
