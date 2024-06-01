export interface Frais {
    nom: string;
    prix: number;
}

export interface Facture {
    _id: any;
    reference?: string;
    date?: Date;
    montantApresRemise: number;
    montantCheque?: number;
    montantRestant?: number;
    statut?: string;
    client?: string;
    offreId: string;
    nomOffre?: string;
    frais?: Frais[];
    userName?: string;
    
}
