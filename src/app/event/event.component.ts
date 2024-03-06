import { Event } from '../models/event';
import { EventService } from './../services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent implements OnInit {

  showError: boolean = false;
  events: Event[] = [];
  date: string = "";

  constructor(private eventService: EventService){ }

  ngOnInit(): void {
    this.loadEvents()
  }

  loadEvents(): void {
    this.showError = false;
    this.eventService.getEvents(this.date).subscribe({
      next: (events: Event[]) =>
      {
        this.events = events;
        console.log("loaded !")
      },
      error: (error) =>
      {
        console.log("Error :" + error)
        this.showError = true;
      }
    })
  }
}
