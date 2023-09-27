import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ApiserviceService } from './apiservice.service'; 
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './user/signin/signin.component';
import { AuthService } from './auth.service';
import { TournamentComponent } from './tournament/tournament.component';
import { EventComponent } from './event/event.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    SigninComponent,
    TournamentComponent,
    EventComponent,
    EventdetailComponent,
    NavbarComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiserviceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
