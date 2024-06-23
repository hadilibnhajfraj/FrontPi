export class Activite {
  _id: string;
  nom: string;
  localisation: string;
  date_act: Date;
  description: string;
  local: string;
  nblimite: number;
  galerie: { data: any; contentType: string }[];
  temperature:string

  constructor(init?: Partial<Activite>) {
    Object.assign(this, init);
  }
}
