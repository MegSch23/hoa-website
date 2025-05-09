import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  events: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventContent: this.renderEventContent
  };

  constructor(private calendarService: CalendarService) {
    this.calendarService.getEvents().subscribe((data) => {
      this.events = data;
      this.calendarOptions = {
          ...this.calendarOptions,
          events: data
    }});
  
  }

  renderEventContent(arg: any) {
    return {
      html: `
        <div class="text-sm">
          <div class="font-bold text-center" style="text-wrap: wrap;">${arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${arg.event.title}</div>
          <div class="italic text-center" style="text-wrap: wrap;">${arg.event.extendedProps.location || ''}</div>
          <div class="pl-1" style="text-wrap: wrap;">${arg.event.extendedProps.description || ''}</div>
        </div>
      `
    };
  }
}
