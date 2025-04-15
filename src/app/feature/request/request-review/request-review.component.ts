import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit, OnDestroy {
  title: string = 'Requests Under Review';
  requests!: Request[];
  subscription = new Subscription();
  loggedInUser!: User;
  welcomeMsg!: string;

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    console.log('Logged in user id:', this.loggedInUser.id);

      this.requestSvc.getAllForReview(this.loggedInUser.id).subscribe({
        next: (res) => {
          this.requests = res;
          console.log('Review Requests:', res);
        },
        error: (err) => {
          console.error('Error loading review requests:', err);
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  approve(id: number): void {

      this.requestSvc.approve(id).subscribe({
        next: (res) => {
          console.log('Request approved:', res);
        },
        error: (err) => {
          console.error('Error approving request:', err);
          alert('Failed to approve the request.');
        }
      });
  }
  
  
}
