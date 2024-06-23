import { Routes } from "@angular/router";


import { RepasComponent } from "../../repas/repas.component";
import { RepasaffichageComponent } from "../../repasaffichage/repasaffichage.component";
import { ModifRepasComponent } from "../../modif-repas/modif-repas.component";
import { BusComponent } from "../../bus/bus.component";
import { EditBusComponent } from "../../edit-bus/edit-bus.component";
import { ChauffeurComponent } from "../../chauffeur/chauffeur.component";
import { ModifchauffeurComponent } from "../../modifchauffeur/modifchauffeur.component";
import { CalendrierComponent } from "../../calendrier/calendrier.component";
import { AfficheChauffeurComponent } from "../../affiche-chauffeur/affiche-chauffeur.component";
import { BusafficheComponent } from "../../busaffiche/busaffiche.component";
import { ActiviteComponent } from "../../activite/activite.component";
import { AjoutAcctiviteComponent } from "../../ajout-acctivite/ajout-acctivite.component";
import { ActiviteModifieComponent } from "../../activite-modifie/activite-modifie.component";
import { EnvoiEmailComponent } from "../../envoi-email/envoi-email.component";
import { AuthGuard } from "../../auth.guard";
import { RoleGuard } from "./role.guard";

export const AdminLayoutRoutes: Routes = [
  {
    path: "calendrier",
    component: CalendrierComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "afficheRepas",
    component: RepasaffichageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "modifRepas/:id",
    component: ModifRepasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "repas",
    component: RepasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "chauffeur",
    component: AfficheChauffeurComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "addActivite",
    component: AjoutAcctiviteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "ActiviteModifie/:id",
    component: ActiviteModifieComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "ajoutchauffeur",
    component: ChauffeurComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "modifChauffeur/:id",
    component: ModifchauffeurComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "bus",
    component: BusafficheComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "ajouterBus",
    component: BusComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "modiferBus/:id",
    component: EditBusComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "activite",
    component: ActiviteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
  {
    path: "email",
    component: EnvoiEmailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ["admin"] },
  },
];
