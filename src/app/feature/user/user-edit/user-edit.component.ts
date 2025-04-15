import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnDestroy{
  title: string = 'User-Edit';
  userId!: string;
  user!: User;
  subscription!: Subscription;
  isAdmin: boolean = false;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sysSvc: SystemService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
    
    ngOnInit(): void {
    this.isAdmin = this.sysSvc.isAdmin();
    this.actRoute.params.subscribe((parms: { [x: string]: any; }) => {
      this.userId = parms['id'];
      this.subscription = this.userSvc.getById(this.userId).subscribe({
        next: (resp: any) => {
          this.user = resp;
        },
        error: (err: any) => {
          console.log('Error retrieving user: ', err);
        },
      });
    });
  }
  save() {
    this.userSvc.update(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log('error saving user', err);
      },
    });
  }

}