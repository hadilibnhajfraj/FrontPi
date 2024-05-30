export class Bus {
  _id: string;
  itineraire: {
    depart: string;
    arrivee: string;
  };
  horaire: string;
  matricule: string;
  chauffeur: {
    _id: string;
    nom: string;
    prenom: string;
    cin: string;
    email: string;
  };
}
