import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { trpc } from '../../trcp/trpc-client';

type CalendarEvent ={ title: string; date: string; location: string, description: string | undefined }


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
 constructor() {}

  getEvents(): Observable<CalendarEvent[]> {
    return from(trpc.getEvents.query());
  }

  addEvent(event: CalendarEvent): Observable<any> {
    return from(trpc.addEvent.mutate(event));
  }

  removeEvent(id: number): Observable<any> {
    return from(trpc.removeEvent.mutate({ id }));
  }
}
