import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../dashboard/dashboard.component";

import { ChartsModule } from "ng2-charts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { CoursComponent } from "../../courses/cours/cours.component";
import { LeconComponent } from "../../courses/cours/lecon/lecon.component";
import { ObservationComponent } from "../../observation/observation/observation.component";
import { EleveComponent } from "../../etudiant/eleve/eleve.component";
import { ChatBotComponent } from "../../chatBot/chat-bot/chat-bot.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    CoursComponent,
    LeconComponent,
    ObservationComponent,
    EleveComponent,
    ChatBotComponent,
  ],
})
export class AdminLayoutModule {}
