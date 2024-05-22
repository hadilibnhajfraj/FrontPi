import { Routes } from "@angular/router";

import { DashboardComponent } from "../../dashboard/dashboard.component";
import { CoursComponent } from "../../courses/cours/cours.component";
import { LeconComponent } from "../../courses/cours/lecon/lecon.component";
import { ObservationComponent } from "../../observation/observation/observation.component";
import { EleveComponent } from "../../etudiant/eleve/eleve.component";
import { ChatBotComponent } from "../../chatBot/chat-bot/chat-bot.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "cours", component: CoursComponent },

  { path: "cours/lecon", component: LeconComponent },
  { path: "observation", component: ObservationComponent },
  { path: "etudiant", component: EleveComponent },
];
