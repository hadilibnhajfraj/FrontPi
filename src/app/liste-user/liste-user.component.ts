import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.css']
})
export class ListeUserComponent implements OnInit {


  userList: any[];

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.fetchUserList();
  }
  fetchUserList(): void {
    this.authService.getAll().subscribe((data: any[]) => {
      this.userList = data;
      console.log(data)
    });
  }
  validateUser(userId: string): void {
    this.authService.validateUser(userId).subscribe(
      () => {
        console.log('User validated successfully');
        alert("User validated successfully")
        this.fetchUserList();
      },
      error => {
        console.error('Error validating user', error);
        alert("Admin users cannot be validated")
      }
    );
  }

  supp(id: string) {
    this.authService.deleteUser(id).subscribe(
      response => {

        console.log('User supprimé avec succès:', response);
        // Mettez à jour votre liste de repas localement après la suppression
        this.userList = this.userList.filter(user => user._id !== id);
        window.location.reload();
        alert('User supprimé avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression du user:', error);
      }
    );
  }
  editUser(id: string) {
    this.router.navigate(['/user-profile', id]);
  }

}
