import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import the FullCalendar module
import { MatRadioModule } from '@angular/material/radio';
import { CalendrierComponent } from '../../calendrier/calendrier.component';
import { HttpClientModule } from '@angular/common/http';
import { CoursComponent } from '../../courses/cours/cours.component';
import { ChatBotComponent } from '../../chatBot/chat-bot/chat-bot.component';
import { EleveComponent } from '../../etudiant/eleve/eleve.component';
import { MatiereComponent } from '../../matiere/matiere/matiere.component';
import { ObservationComponent } from '../../observation/observation/observation.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FullCalendarModule,
    MatRadioModule
  ],
  declarations: [
    
    CoursComponent,
    ObservationComponent,
    EleveComponent,
    ChatBotComponent,
    MatiereComponent,
    CalendrierComponent
  ]
})
export class AdminLayoutModule {}
