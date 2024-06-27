
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ListeUserComponent } from '../../liste-user/liste-user.component';
import { RoleGuard } from './role.guard';
import { AuthGuard } from '../../auth.guard';
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

import { AfficherepasParentComponent } from "../../afficherepas-parent/afficherepas-parent.component";
import { AffichebusParentComponent } from "../../affichebus-parent/affichebus-parent.component";
import { FetchNotificationComponent } from "../../fetch-notification/fetch-notification.component";
import { FetchActiviteComponent } from "../../fetch-activite/fetch-activite.component";
import { InscriptionComponent } from "../../inscription/inscription.component";
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { CoursComponent } from '../../courses/cours/cours.component';
import { EleveComponent } from '../../etudiant/eleve/eleve.component';
import { MatiereComponent } from '../../matiere/matiere/matiere.component';
import { ObservationComponent } from '../../observation/observation/observation.component';
export const AdminLayoutRoutes: Routes = [
  { path: "cours", component: CoursComponent },
  { path: "observation", component: ObservationComponent },
  { path: "etudiant", component: EleveComponent },
  { path: "matiere", component: MatiereComponent },
  {
    path: 'listUser',
    component: ListeUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin'] }
  },
  {

    path: 'user-profile/:id',

    component: UserProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  },
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
  {
    path: "repasAffichage",
    component:AfficherepasParentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['parent'] }
  },
  {
    path: "busaffichage",
    component:AffichebusParentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['parent'] }
  },
  {
    path: "fetchActivite",
    component:FetchActiviteComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['parent'] }
  },
  {
    path: "inscrire/:id",
    component:InscriptionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['parent'] }
  },

];
