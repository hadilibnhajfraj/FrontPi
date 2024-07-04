import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular'; // Import the FullCalendar module
import { MatRadioModule } from '@angular/material/radio';
import { CalendrierComponent } from '../../calendrier/calendrier.component';
import { HttpClientModule } from '@angular/common/http';
import { CoursComponent } from '../../courses/cours/cours.component';
import { ChatBotComponent } from '../../chatBot/chat-bot/chat-bot.component';
import { EleveComponent } from '../../etudiant/eleve/eleve.component';
import { MatiereComponent } from '../../matiere/matiere/matiere.component';
import { ObservationComponent } from '../../observation/observation/observation.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { ListChequeComponent } from '../../list-cheque/list-cheque.component';
import { GestionEmploisComponent } from '../../gestion-emplois/gestion-emplois.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EtudiantComponent } from '../../etudiants/etudiants.component';
import { ClassComponent } from '../../class/class.component';
import { SalleComponent } from '../../salle/salle.component';


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
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  declarations: [

    CoursComponent,
    ObservationComponent,
    EleveComponent,
    ChatBotComponent,
    MatiereComponent,
    CalendrierComponent,
    DashboardComponent,
   ListChequeComponent,
    TableListComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent, 
    GestionEmploisComponent,
    EtudiantComponent,
    ClassComponent,
    SalleComponent
  ]
})
export class AdminLayoutModule {}
