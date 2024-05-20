
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import * as Chartist from 'chartist';
import dayGridPlugin from '@fullcalendar/daygrid'; // Optional: For month view
import timeGridPlugin from '@fullcalendar/timegrid'; // For week view
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {

  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    dateClick: this.handleDateClick.bind(this),
    events: [
      { title: 'Event 1', start: '2024-05-19T10:00:00', end: '2024-05-19T12:00:00' },
      { title: 'Event 2', start: '2024-05-20T14:00:00', end: '2024-05-20T16:00:00' }
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    }
  };

  handleDateClick(arg) {
    alert('Date clicked: ' + arg.dateStr);
    this.router.navigate(['/repas'], { queryParams: { date: arg.dateStr } });
  }
}
