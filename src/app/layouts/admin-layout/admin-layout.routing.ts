import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { UserProfileComponent } from "../../user-profile/user-profile.component";
import { TableListComponent } from "../../table-list/table-list.component";

import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { UpgradeComponent } from "../../upgrade/upgrade.component";
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

export const AdminLayoutRoutes: Routes = [
  //{ path: "dashboard", component: DashboardComponent },
  { path: "calendrier", component: CalendrierComponent },
  { path: "afficheRepas", component: RepasaffichageComponent },
  { path: "modifRepas/:id", component: ModifRepasComponent },
  { path: "repas", component: RepasComponent },
  { path: "chauffeur", component: AfficheChauffeurComponent },
  { path: "addActivite", component: AjoutAcctiviteComponent },
  { path: "ActiviteModifie/:id", component: ActiviteModifieComponent },
  //{ path: "chauffeur", component: UserProfileComponent },
  { path: "ajoutchauffeur", component: ChauffeurComponent },
  { path: "modifChauffeur/:id", component: ModifchauffeurComponent },
  { path: "bus", component: BusafficheComponent },
  { path: "ajouterBus", component: BusComponent },
  { path: "modiferBus/:id", component: EditBusComponent },
  { path: "activite", component: ActiviteComponent },
  { path: "email", component: EnvoiEmailComponent },
];
