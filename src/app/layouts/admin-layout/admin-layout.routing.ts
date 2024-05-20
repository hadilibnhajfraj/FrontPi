import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { CoursComponent } from "../../courses/cours/cours.component";
import { LeconComponent } from "../../courses/cours/lecon/lecon.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "cours", component: CoursComponent },

  { path: "cours/lecon", component: LeconComponent },
];
