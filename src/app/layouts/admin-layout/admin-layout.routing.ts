import { ReclamationsComponent } from './../../reclamations/reclamations.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';

import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AddreclamationComponent } from '../../addreclamation/addreclamation.component';
import { EditreclamationComponent } from '../../editreclamation/editreclamation.component';
import { ViewreclamationComponent } from '../../viewreclamation/viewreclamation.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: ReclamationsComponent },
    { path: 'addReclamation',      component: AddreclamationComponent },
    { path: 'editReclamation/:id',      component: EditreclamationComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'viewreclamation/:id',      component: ViewreclamationComponent },
];
