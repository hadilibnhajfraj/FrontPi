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

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "afficheRepas", component: RepasaffichageComponent },
  { path: "modifRepas/:id", component: ModifRepasComponent },
  { path: "repas", component: RepasComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "table-list", component: TableListComponent },
  { path: "bus", component: IconsComponent },
  { path: "ajouterBus", component: BusComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
];
