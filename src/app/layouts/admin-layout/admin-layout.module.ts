import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";
import { HttpClientModule } from '@angular/common/http';

import { ChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { CoursComponent } from "../../courses/cours/cours.component";
import { ObservationComponent } from "../../observation/observation/observation.component";
import { EleveComponent } from "../../etudiant/eleve/eleve.component";
import { ChatBotComponent } from "../../chatBot/chat-bot/chat-bot.component";
import { MatiereComponent } from "../../matiere/matiere/matiere.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    DashboardComponent,
    CoursComponent,
    ObservationComponent,
    EleveComponent,
    ChatBotComponent,
    MatiereComponent
  ],
})
export class AdminLayoutModule {}
