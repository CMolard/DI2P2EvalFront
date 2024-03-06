import { EventService } from './../../../services/event.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent {
  title: string = '';
  description: string = '';
  location: string = '';
  date: string = '';

  postForm: boolean = false;

  form: FormGroup = new FormGroup({
    title: new FormControl(this.title, [
      Validators.required,
    ]),
    description: new FormControl(this.description, [
      Validators.required,
    ]),
    location: new FormControl(this.location, [
      Validators.required,
    ]),
    date: new FormControl(this.date, [
      Validators.required,
    ]),
  })

  constructor(private eventService: EventService, private router: Router){}

  addNew(): void{
    this.postForm = true;
    if(!this.form.invalid)
    {
      this.eventService.addEvent(this.title, this.description, this.location, this.date)
      .subscribe({
        next: (event: Event) => {
          this.router.navigateByUrl("/events")
        }
      })
    }
  }
}
