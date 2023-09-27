import { Component, OnInit, Input } from '@angular/core';2
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { error, warn } from 'console';
import { isEmpty } from 'rxjs';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() eventData: any;
  EventID: number = 0;
  TournamentID: number = 0;
  EventName: string = '';
  EventNumber: number = 0;
  EventDateTime: string = '';
  EventEndDateTime?: string;
  AutoClose = false;
  EventIDUpdate: number = 0;
  EventNameUpdate: string = '';
  EventNumberUpdate: number = 0;
  EventDateTimeUpdate: string = '';
  EventEndDateTimeUpdate?: string;
  AutoCloseUpdate = false;
  user: any;
  events: any = [];
  tournaments: any = [];
  token: string = '';
  selectLevel: number=0;
  empty = false;
  month = '';
  year = '';
  day = '';
  constructor(private service: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.EventID = this.EventID
    this.TournamentID = this.TournamentID;
    this.EventName = this.EventName;
    this.EventNumber = this.EventNumber;
    this.EventDateTime = this.EventDateTime;
    this.EventEndDateTime = this.EventEndDateTime;
    this.AutoClose = this.AutoClose
    this.EventIDUpdate = this.EventID
    this.EventNameUpdate = this.EventName;
    this.EventNumberUpdate = this.EventNumber;
    this.EventDateTimeUpdate = this.EventDateTime;
    this.EventEndDateTimeUpdate = this.EventEndDateTime;
    this.AutoCloseUpdate = this.AutoClose
    const data = localStorage.getItem('userData');
    this.user = JSON.parse(data!);
    if(this.user.token === '')
    {
      this.router.navigate(['/signin']);
    }else{
      this.token = this.user.token;
      this.getTournaments();
      if(this.TournamentID !== 0)
      {
        this.getEvents();
      }
      
    }
  }
  isValid(): boolean
  {
    
    if(this.TournamentID === 0)
    {
      alert('Please select tournament');
      return false;
    }
    if(this.EventName === '')
    {
      alert('Please enter event name');
      return false;
    }
    if(this.EventNumber === 0 || this.EventNumber < 0)
    {
      alert('Please enter event number');
      return false;
    }
    if(this.EventDateTime === '')
    {
      alert('Please enter event date');
      return false;
    }
    return true
  }
  addEvent(){
    if(this.isValid())
    {
      var event  = {
        tournamentID: this.TournamentID,
        eventName: this.EventName,
        eventNumber: this.EventNumber,
        eventDateTime: this.EventDateTime,
        eventEndDateTime: this.EventEndDateTime,
        autoClose: this.AutoClose
      };
      this.service.addEvent(event,this.token).subscribe( response => {
        if(response === false){
          alert("Not Added");
        }else{
          this.getEvents();
          this.clear();
        }
      }, error =>{
        alert("Error occured "+error);
      });
    }
    
  }
  getTournaments()
  {
    if(this.token !== '')
    {
      this.service.getTournaments(this.token).subscribe( response =>{
        if(response !== null)
        {
          this.tournaments = response;
        }
      }, error => {
        alert('Error occured');
      });
    }
     
  }
  getEvents()
  {
    this.events = [];
      this.service.getEvents(this.TournamentID, this.token).subscribe(response =>{
        if(response !== null)
        {
          response.forEach(element => {
            element.eventDateTime = element.eventDateTime.replace('T',' ')
            element.eventEndDateTime = element.eventEndDateTime !== ''? element.eventEndDateTime.replace('T',' ') : ''
            this.events.push(element)
          });
        }
      }, error => {
        alert('Please add events');
      });
  }
   editEvent(event: any) {
    this.EventNameUpdate = event.eventName;
    this.EventNumberUpdate = event.eventNumber;
    this.EventDateTimeUpdate = event.eventDateTimeFormatted;
    this.EventEndDateTimeUpdate = event.eventEndDateFormatted;
    this.AutoCloseUpdate = event.autoClose;
    this.EventIDUpdate = event.eventID;
  }
  clear()
  {
    this.EventName = '';
    this.EventNumber = 0;
    this.EventDateTime = '';
    this.EventEndDateTime = '',
    this.AutoClose = false;
    this.EventID = 0;
  }
  updateEvent()
  {
    if(this.isValidUpdate())
    {
      var event  = {
        eventId: this.EventIDUpdate,
        eventName: this.EventNameUpdate,
        eventNumber: this.EventNumberUpdate,
        eventDateTime: this.EventDateTimeUpdate,
        eventEndDateTime: this.EventEndDateTimeUpdate === ''? null : this.EventEndDateTimeUpdate,
        autoClose: this.AutoCloseUpdate
      };
      this.service.updateEvent(event, this.token).subscribe( response =>{
        
        if(response !== true)
        {
          alert('Error occured updating');
        }else{
          this.getEvents();
        }
      }, error =>{
        alert('Error occured updating '+error);
      });
    }
    
  }
  isValidUpdate(): boolean
  {

    if(this.EventNameUpdate === '')
    {
      alert('Please enter event name');
      return false;
    }
    if(this.EventNumberUpdate === 0 || this.EventNumber < 0)
    {
      alert('Please enter event number');
      return false;
    }
    if(this.EventDateTimeUpdate === '')
    {
      alert('Please enter event date');
      return false;
    }
    return true
  }
  deleteEvent(event: any)
  {
    if(confirm('Delete this event?')){
      this.service.deleteEvent(event.eventID,this.token).subscribe(response => {
        if(response === true)
        {
          this.getEvents();
        }
      }, error =>{
        console.log(error);
        alert('Error occured '+error);
      })
    }
  }
  eventDetails(event: any)
  {
    localStorage.setItem('event',JSON.stringify(event));
    this.router.navigate(['layout/eventdetail']);
  }
}
