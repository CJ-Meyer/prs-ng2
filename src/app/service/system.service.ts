import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = new User();

  constructor(private router: Router) {}

  checkLogin(): void {
    console.log('Checking login status...');
    console.log('Logged in user ID:', this.loggedInUser.id);
    if (this.loggedInUser.id == 0) {
      console.log('User not authenticated. Redirecting to login.');
      this.router.navigateByUrl('/user-login');
    }
  }
  isAdmin(): boolean {
    console.log('Checking if user is admin...');
    return this.loggedInUser.isAdmin == true;
  }
}
