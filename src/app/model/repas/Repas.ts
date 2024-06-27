import { Allergie } from "../Allergie";

export class Repas {
  _id:string;
  jour!: Date;
  nomRepas!: string;
  tempsRepas!: string;
  allergiesEleve: Allergie[];
  favoriteCount: number;
}
