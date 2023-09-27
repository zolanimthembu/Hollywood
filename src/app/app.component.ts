import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hollywood';
  currentUser: any;
  constructor(private authService: AuthService) {}
    ngOnInit() {
      // Get the user's email from the AuthService
      this.currentUser = this.authService.getUser();
  }
}
