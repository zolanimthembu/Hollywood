import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;

  setUser(currentUser: any) {
    this.currentUser = currentUser;
  }

  getUser(): any {
    return this.currentUser;
  }
  constructor() { }
}
