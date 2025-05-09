import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { trpc } from '../../trcp/trpc-client';
import { z } from 'zod';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
 constructor() {}

  getEvents(): Observable<any> {
    return from(trpc.getEvents.query());
  }

  addEvent(event: { title: string; date: string; location: string }): Observable<any> {
    return from(trpc.addEvent.mutate(event));
  }

  removeEvent(id: number): Observable<any> {
    return from(trpc.removeEvent.mutate({ id }));
  }
}
