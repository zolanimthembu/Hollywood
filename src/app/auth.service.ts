import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public name = '';
  // Simulate login
  login(): void {
    this.isAuthenticatedSubject.next(true);
  }

  // Simulate logout
  logout(): void {
    this.isAuthenticatedSubject.next(false);
  }

  // Check authentication status
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
  
