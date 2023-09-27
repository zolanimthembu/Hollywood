import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './user/add-user/add-user.component';  
import { SigninComponent } from './user/signin/signin.component';  
import { TournamentComponent } from './tournament/tournament.component';
import { EventComponent } from './event/event.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
const routes: Routes = [ 
  {
    
    path:'layout',
    component: LayoutComponent, 
    children:[
      {path: 'register', component: AddUserComponent},
      {path: 'signin', component: SigninComponent},
      {path:'tournament', component: TournamentComponent},
      {path:'event', component: EventComponent},
      {path:'eventdetail', component: EventdetailComponent},
      //{path:'navbar', component:NavbarComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
