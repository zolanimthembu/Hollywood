import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { error } from 'console';
import { first } from 'rxjs';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  @Input() eventData: any;
  eventDetails: any = [];
  eventStatus: any = [];
  token: any;
  user: any;
  EventID = 0;
  EventDetailStatusID = 0;
  EventDetailName = '';
  EventDetailOdd = 0;
  EventDetailNumber = 0
  FinishingPosition? = .0;
  FirstTimer = false;
  EventDetailID = 0;
  displayEventName = '';
  constructor(private service: ApiserviceService, private router: Router) { }

  ngOnInit(): void {
    this.EventDetailStatusID = this.EventDetailStatusID;
    this.EventDetailName = this.EventDetailName;
    this.EventDetailOdd = this.EventDetailOdd;
    this.FinishingPosition = this.FinishingPosition;
    this.FirstTimer = this.FirstTimer
    this.EventDetailNumber = this.EventDetailNumber;

   const data = localStorage.getItem('event');
   this.eventData = JSON.parse(data!);
   const user = localStorage.getItem('userData');
   this.user = JSON.parse(user!); 
   this.displayEventName = this.eventData.eventName.toUpperCase();
   if(user !== null)
   {
      this.token = this.user.token
   }
   else{
      this.router.navigate(["/user/signin"]);
   }
   this.getStatuses();
   this.getEventDetails();
  }
  getStatuses(){
    this.service.getEventDetaislStatuses(this.token).subscribe( response => {
       if(response !== null)
       {
         this.eventStatus = response;
       }
    }, error =>{
        console.log('error getting statuses');
    });
  }
  isValid(): boolean {
    if(this.EventDetailStatusID === 0)
    {
      alert('Please select status');
      return false;
    }
    if(this.EventDetailName === '')
    {
      alert('Enter event detail name')
      return false;
    }
    if(this.EventDetailOdd <= 0)
    {
      alert('Enter Odds')
      return false;
    }
    if(this.EventDetailNumber <= 0)
    {
      alert('Enter detail number')
      return false;
    }
    return true;
  }
  addEventDetails()
  {
    if(this.isValid())
    {
      var detail = {
        eventDetailStatusID: this.EventDetailStatusID,
        eventDetailName: this.EventDetailName,
        eventDetailOdd: this.EventDetailOdd,
        finishingPosition: this.FinishingPosition === 0? null : this.FinishingPosition,
        firstTimer:this.FirstTimer,
        eventDetailNumber: this.EventDetailNumber,
        eventID: this.eventData.eventID
      };
      this.service.addEventDetails(detail,this.token).subscribe( response => {
        if(response === true)
        {
          this.getEventDetails();
          this.clear();
        }
      }, error =>{
        console.log('Error adding');
      });
    }
  }
  getEventDetails()
  {
    this.service.getEventDetails(this.eventData.eventID, this.token).subscribe( response =>{
      if(response !== null)
      {
         this.eventDetails = response;
      }
    }, error =>{
      console.log('Error getting event details');
    });
  }
  clear()
  {
    this.EventDetailStatusID = 0;
    this.EventDetailName = '';
    this.EventDetailOdd = 0;
    this.FinishingPosition = 0;
    this.FirstTimer = false;
    this.EventDetailNumber = 0;
  }
  editEventDetail(eventDetail: any)
  {
    this.EventDetailStatusID = eventDetail.eventDetailStatusID;
    this.EventDetailName = eventDetail.eventDetailName;
    this.EventDetailOdd = eventDetail.eventDetailOdd;
    this.FinishingPosition = eventDetail.finishingPosition === null? 0 : eventDetail.finishingPosition;
    this.FirstTimer = eventDetail.firstTimer;
    this.EventDetailNumber = eventDetail.eventDetailNumber;
    this.EventDetailID = eventDetail.eventDetailID
  }
  updateEventDetail(){
    if(this.isValid())
    {
      var detail = {
        eventDetailStatusID: this.EventDetailStatusID,
        eventDetailName: this.EventDetailName,
        eventDetailOdd: this.EventDetailOdd,
        finishingPosition: this.FinishingPosition === 0? null : this.FinishingPosition,
        firstTimer:this.FirstTimer,
        eventDetailNumber: this.EventDetailNumber,
        eventDetailID: this.EventDetailID
      };
      this.service.updateEventDetail(detail,this.token).subscribe(response =>{
        if(response === true)
        {
          this.getEventDetails();
        }
      }, error => {
        console.log('Error updateing events');
      })
    }  
  }
  deleteDetail(detail: any)
  {
    if(confirm('Delete these details'))
    {
       this.service.deleteEventDetail(detail.eventDetailID, this.token).subscribe( response =>{
        if(response === true)
        {
          this.getEventDetails();
        }
       }, error =>{
        console.log('Error occured while deleting');
       })
    }
  }
}
