import { Frais } from "./Frais";

export class Offre {
  frais!: Frais[]; // Modifier ceci
  montant!: number;
  remise!: number;
  montantApresRemise!: number;
  _id: string | null;
  userId: any;
}
