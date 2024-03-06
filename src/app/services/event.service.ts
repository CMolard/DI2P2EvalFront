import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Event } from '../models/event';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventUrl = 'Events';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getEvents(date: string): Observable<Event[]> {
    return this.httpClient.get<Event[]>(`${environment.apiUrl}${this.eventUrl}`, this.httpOptions)
    .pipe(map(events => events.filter((event) =>
    {
      if(date)
      {
        console.log(event.Date +" " + date)
        return formatDate(new Date(event.Date), 'yyyy-MM-dd', 'en-US') === formatDate(new Date(date), 'yyyy-MM-dd', 'en-US');
      }

      return true;
    })));
  }
}
