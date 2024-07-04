import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/AuthService';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  //styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any = {
    _id: '',
    login: '',
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
    countryCode:'',

  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getChauffeurDetails();
  }

  getChauffeurDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.authService.getUser(id).subscribe(
        (data: any) => {
          this.user = data;
        },
        (error) => {
          console.error('Error fetching chauffeur details:', error);
        }
      );
    }
  }
  onSubmit(): void {
    const id = this.user._id; // Ensure you have the user ID
    this.authService.updateUser(id, this.user).subscribe(
      (response) => {
        console.log('Chauffeur updated:', response);
        this.router.navigate(['/listUser']); // Rediriger vers la liste des chauffeurs après la modification
      },
      (error) => {
        console.error('Error updating chauffeur:', error);
      }
    );
  }
}
