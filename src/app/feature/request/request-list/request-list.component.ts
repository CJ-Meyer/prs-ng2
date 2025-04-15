import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit, OnDestroy {
  title: string = 'Request-List';
  requests: Request[] = [];
  subscription!: Subscription;
  welcomeMsg!: string;
  loggedInUser!: User;
  isAdmin: boolean = false;

  constructor(private requestSvc: RequestService, private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.isAdmin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.subscription = this.requestSvc.list().subscribe({
      next: (resp) => (this.requests = resp),
      error: (err) => console.error('Error loading requests:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id: number): void {
    this.requestSvc.delete(id).subscribe(() => {
      this.requests = this.requests.filter(r => r.id !== id);
    });
  }
}
