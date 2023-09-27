import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  readonly apiUrl = 'https://localhost:7186/';

  constructor(private http: HttpClient) { }
 

  //Add new User
  addUser(user: any): Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'api/Auth/AddUser', user, httpOptions);
  }
  //User login
  Signin(login: any): Observable<any>{
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>(this.apiUrl + 'api/Auth/Signin?email='+login.email+'&password='+login.password, httpOptions);
  }

}
