import { Component, OnInit, Input } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  
  constructor(private service: ApiserviceService, private router: Router, private authService: AuthService ) { }
  
  @Input() login: any;
  Email = "";
  Password = "";
  
  ngOnInit(): void {
    this.Email = this.Email;
    this.Password = this.Password;
    localStorage.removeItem('userData');
    localStorage.removeItem('event');
    localStorage.clear();

  }
    signin(){
      
      var login = {
        email: this.Email,
        password: this.Password
      };
      this.service.Signin(login).subscribe(response => {
        if (response.emailAddress !='') {
          //set is logged on
          //current user data
          this.authService.name = response.name;
          this.authService.login();
          localStorage.setItem('userData',JSON.stringify(response));
          // Redirect to the home component
          this.router.navigate(['/layout/tournament']);
          
        } else {
          alert("User not found");
        }
      }, error =>{
        console.error(error);
        alert("Error occured");
      });
    }
}
