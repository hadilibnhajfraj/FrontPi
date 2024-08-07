import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { RepasService } from '../service/repas.service';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {

  constructor(private router: Router, private repasService: RepasService) {}

  ngOnInit(): void {
    this.getRepas(); // Appeler la méthode pour récupérer les repas au chargement du composant
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: this.handleDateClick.bind(this),
    events: []
  };

  handleDateClick(arg) {
    alert('Date clicked: ' + arg.dateStr);
    this.router.navigate(['/repas'], { queryParams: { date: arg.dateStr } });
  }

  getRepas() {
    this.repasService.getAllRepas().subscribe(
      (data) => {
        const events = this.organizeRepasByDate(data); // Organiser les repas par date
        this.calendarOptions.events = events; // Mettre à jour les événements du calendrier
      },
      (error) => {
        console.error(error);
      }
    );
  }

  organizeRepasByDate(repas) {
    const events = [];
    repas.forEach(repas => {
      events.push({
        title: repas.nomRepas,
        start: repas.jour
      });
    });
    console.log(events)
    return events;

  }

}
