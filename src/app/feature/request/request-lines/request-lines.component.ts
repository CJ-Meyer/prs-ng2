import { Component, OnInit, OnDestroy } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';
import { LineItemService } from '../../../service/line-item.service';
import { LineItem } from '../../../model/line-item';

@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  titleRequest: string = 'Request-Lines';
  titleLines: string = 'Line-Items for Request'
  lineItems: LineItem[] = [];
  request!: Request;

  subscription!: Subscription;
  welcomeMsg!: string;
  loggedInUser!: User;
  isAdmin: boolean = false;

  constructor(private requestSvc: RequestService, private sysSvc: SystemService, private liSvc: LineItemService) {}

  ngOnInit(): void {
    console.log('RequestListComponent');
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.isAdmin;
    this.subscription = this.requestSvc.list().subscribe({
      next: (resp) => (this.request = resp),
      error: (err) => console.error('Error loading requests:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  delete(id: number): void {
    this.liSvc.delete(id).subscribe(() => {
      this.request = this.request.filter(r => r.id !== id);
    });
  }
}
