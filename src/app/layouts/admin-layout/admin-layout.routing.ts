import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { CoursComponent } from "../../courses/cours/cours.component";
import { ObservationComponent } from "../../observation/observation/observation.component";
import { EleveComponent } from "../../etudiant/eleve/eleve.component";
import { MatiereComponent } from "../../matiere/matiere/matiere.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "cours", component: CoursComponent },
  { path: "observation", component: ObservationComponent },
  { path: "etudiant", component: EleveComponent },
  { path: "matiere", component: MatiereComponent },

];
