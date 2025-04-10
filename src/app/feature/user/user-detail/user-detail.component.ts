import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  
  title: string = 'User-Detail';
  username!: string;
  user!: User;
  subscription!: Subscription;

  constructor(
    private userSvc: UserService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.username = params['id'];
      this.subscription = this.userSvc.getById(this.username).subscribe({
        next: (resp) => {
          this.user = resp;
          console.log('User retrieved: ', this.user);
        },
        error: (err) => {
          console.log('Error retrieving user: ', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete(): void {
    this.userSvc.delete(this.user.id).subscribe({
      next: () => {
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log('Error deleting user:', err);
      }
    });
  }
}
