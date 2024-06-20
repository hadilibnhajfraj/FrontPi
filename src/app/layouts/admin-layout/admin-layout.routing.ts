
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ListeUserComponent } from '../../liste-user/liste-user.component';
import { RoleGuard } from './role.guard';
import { AuthGuard } from '../../auth.guard';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'listUser',
    component: ListeUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin'] }
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  },
  {
    path: 'table-list',
    component: TableListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  },
  {
    path: 'icons',
    component: IconsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  },
  {
    path: 'maps',
    component: MapsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  },
  {
    path: 'upgrade',
    component: UpgradeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: ['admin', 'enseignant', 'parent'] }
  }
];
