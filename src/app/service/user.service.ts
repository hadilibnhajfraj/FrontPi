import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // Méthode pour obtenir l'ID utilisateur actuellement connecté
  getUserId(): string {
    // Vous pouvez retourner l'ID utilisateur spécifique pour le test
    return '664bccd134d4f15588b41261';
  }

  // Autres méthodes liées à l'utilisateur peuvent être ajoutées ici
}