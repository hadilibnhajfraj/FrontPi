export class Banque {
    _id?: string; // L'identifiant MongoDB est optionnel car il n'est pas défini avant la création
    chequeId: string;
  
    constructor(chequeId: string) {
      this.chequeId = chequeId;
    }
  }
  