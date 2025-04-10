import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  title: string = 'User-List';
  users!: User[];
  subscription!: Subscription;
  welcomeMsg!: string;
  loggedInUser!: User;
  isAdmin: boolean = false;
  isReviewer: boolean = false;



  loadUsers(): void {
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;
    });
  }

  delete(id: number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.userSvc.list().subscribe((resp) => {
          this.users = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user for id: '+id);
        alert('Error deleting user for id: '+id);
      }
    });
  }

  constructor(private userSvc: UserService, private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.isAdmin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.subscription = this.userSvc.list().subscribe((resp) => {
      this.users = resp;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
