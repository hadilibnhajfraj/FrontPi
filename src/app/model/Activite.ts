export class Activite {
  _id: string;
  nom: string;
  localisation: string;
  date_act: Date;
  description: string;
  local: string;
  nblimite: number;
  galerie: { data: any; contentType: string }[];

}
