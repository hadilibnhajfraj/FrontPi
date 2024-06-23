import { NotificationService } from './../service/notification.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-envoi-email',
  templateUrl: './envoi-email.component.html',
  styleUrls: ['./envoi-email.component.css']
})
export class EnvoiEmailComponent implements OnInit {
  notification = {
    emailParent: '',
    message: ''
  };

  constructor(private router: Router, private http: HttpClient,private notificationService:NotificationService) {}
ngOnInit(): void {

}
  envoyer() {
    this.router.navigate(['/email']);
  }

  onSubmit() {
    this.notificationService.envoyerNotification(this.notification).subscribe(
      (response) => {
        console.log('Notification added:', response);
        alert('Notification ajouté avec succès');
        this.router.navigate(['/chauffeur']);
      },
      (error) => {
        console.error('Error adding Notification:', error);
      }
    );
  }


}
