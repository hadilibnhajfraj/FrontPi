import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { FullCalendarModule } from '@fullcalendar/angular'; // Import the FullCalendar module
import dayGridPlugin from '@fullcalendar/daygrid'; // Optional: For month view
import timeGridPlugin from '@fullcalendar/timegrid'; // For week view
import interactionPlugin from '@fullcalendar/interaction';
import { MatRadioModule } from '@angular/material/radio';

import { CalendrierComponent } from '../../calendrier/calendrier.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    MatRadioModule
  ],
  declarations: [

    CalendrierComponent
  ]
})

export class AdminLayoutModule {}
