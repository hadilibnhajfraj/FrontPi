import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ChequeComponent } from '../../cheque/cheque.component';
import { OffreComponent } from '../../offre/offre.component';
import { FraisComponent } from '../../frais/frais.component';
import { FactureComponent } from '../../facture/facture.component';
import { UpdatechequeComponent } from '../../updatecheque/updatecheque.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'cheque/:id',      component: ChequeComponent },
    { path: 'offre/:id',      component: OffreComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'frais/:id', component: FraisComponent },
    { path: 'facture/:id', component: FactureComponent },
    { path: 'updatecheque/:id', component: UpdatechequeComponent },

];
