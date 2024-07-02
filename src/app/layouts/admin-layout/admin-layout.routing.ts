import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

import { GestionEmploisComponent } from '../../gestion-emplois/gestion-emplois.component';
import { EmploiDetailComponent } from '../../emploi-detail/emploi-detail.component';
import { EtudiantComponent } from '../../etudiant/etudiant.component';
import { ClassComponent } from '../../class/class.component';
import { SalleComponent } from '../../salle/salle.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: "enplois", component: GestionEmploisComponent },
    { path: 'enploisdetail/:id', component: EmploiDetailComponent }, // Ajouter ':id' comme paramètre d'ID
    { path: 'etudiant', component: EtudiantComponent }, 
    { path: 'classe', component: ClassComponent }, // Ajouter ':id' comme paramètre d'ID
    { path: 'salle', component: SalleComponent },
];
