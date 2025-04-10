import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  subscription!: Subscription;
  user!: User;
  message: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.userLogin.username = 'CAP';
    this.userLogin.password = 'America';
    console.log('UserLoginComponent initialized', this.userLogin);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  login() {
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        this.sysSvc.loggedInUser = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        this.message = 'Invalid login - bad username/pwd combo';
      },
    });
  }
}