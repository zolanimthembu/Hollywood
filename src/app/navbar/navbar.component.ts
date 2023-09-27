import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //@Input()
  title = 'Hollywood';
  user: any = '';
  isSignedIn: boolean = false;
  name = '';
  constructor(private router: Router, private authService: AuthService) {

    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isSignedIn = isAuthenticated;
      this.name = this.authService.name
     
    });
    
  }
  
  ngOnInit(): void {
    if(this.isSignedIn){
      const data = localStorage.getItem("userData"); 
      this.user = JSON.parse(data!);
      console.log('user');
    }
  }
  logout(): void {
    console.log("logout");
    this.authService.logout();
    localStorage.removeItem('userData');
    localStorage.clear();
    this.router.navigate(['/layout/signin']);
  }
  login()
  {
    this.router.navigate(['/layout/signin']);
  }
}
