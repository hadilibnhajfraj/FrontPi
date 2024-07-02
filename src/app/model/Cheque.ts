export interface Cheque {
  _id?: string;
  reference: number;
  proprietaire: string;
  montant: number;
  echeance: string;
  statut?: string;
  paiement?: string;
  factureId: string;
  imageText?: string;
}
