import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './user/add-user/add-user.component';  
import { SigninComponent } from './user/signin/signin.component';  

const routes: Routes = [ {path: 'register', component: AddUserComponent},
{path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
