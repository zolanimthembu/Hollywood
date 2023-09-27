import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'https://localhost:7186/';

  constructor(private http: HttpClient) { }
 
  //User start
  //Add new User---------------------
  addUser(user: any): Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'api/Auth/AddUser', user, httpOptions);
  }
  //User login
   Signin(login: any): Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return  this.http.post<any>(this.apiUrl + 'api/Auth/Signin?email='+login.email+'&password='+login.password, httpOptions);
  }
  //User end------------------------------
  //tournament start------------------------
  addTournament(tournamentName: any, token: string): Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.post<any>(this.apiUrl + 'api/Tournament/AddNewTournament', tournamentName ,httpOptions);
  }
  getTournaments(token: string) : Observable<any[]>{

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.get<any[]>(this.apiUrl + 'api/Tournament/GetTournaments',httpOptions);
  }
  updateTournament(tournament: any, token: string) : Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.put<boolean>(this.apiUrl + 'api/Tournament/UpdateTournament', tournament ,httpOptions);
  }
  deleteTounarment(tournament: any, token: string) : Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.delete<boolean>(this.apiUrl + 'api/Tournament/DeleteTournament/'+tournament.tournamentId ,httpOptions);
  }
  //Tournament end------------------------
  //Event start ------------------
  addEvent(event: any, token: string): Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.post<boolean>(this.apiUrl + 'api/Event/AddNewEvent', event ,httpOptions);
  }
  getEvents(tournamentId: number,token: string) : Observable<any[]>{

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.get<any[]>(this.apiUrl + 'api/Event/GetEvents/'+tournamentId,httpOptions);
  }
  updateEvent(event: any, token: string) : Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.put<boolean>(this.apiUrl + 'api/Event/UpdateEvent', event ,httpOptions);
  }
  deleteEvent(eventId: any, token: string) : Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.delete<boolean>(this.apiUrl + 'api/Event/DeleteEvent/'+eventId ,httpOptions);
  }
  //end event------------------
  //start event details-------------------
  addEventDetails(eventDetails: any, token: string): Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.post<boolean>(this.apiUrl + 'api/EventDetails/AddNewEventDetails', eventDetails ,httpOptions);
  }
  getEventDetails(eventId: number,token: string) : Observable<any[]>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.get<any[]>(this.apiUrl + 'api/EventDetails/GetEventDetails/'+eventId,httpOptions);
  }
  getEventDetaislStatuses(token: string) : Observable<any[]>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.get<any[]>(this.apiUrl + 'api/EventDetails/GetEventDetailStatuses/',httpOptions);
  }
  updateEventDetail(eventDetail: any, token: string) : Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.put<boolean>(this.apiUrl + 'api/EventDetails/UpdateEventDetails', eventDetail ,httpOptions);
  }
  deleteEventDetail(eventDetailId: any, token: string) : Observable<boolean>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'
    , 'Authorization': 'Bearer '+token }) };
    return  this.http.delete<boolean>(this.apiUrl + 'api/EventDetails/DeleteEventDetails/'+eventDetailId ,httpOptions);
  }
}
