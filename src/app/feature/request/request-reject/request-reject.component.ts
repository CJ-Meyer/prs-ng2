import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-reject',
  standalone: false,
  templateUrl: './request-reject.component.html',
  styleUrls: ['./request-reject.component.css']
})
export class RequestRejectComponent implements OnInit, OnDestroy {
  title: string = 'Reject Request';
  requestId!: number;
  reasonForRejection: string = '';
  lineItems: LineItem[] = [];
  subscription = new Subscription();

  constructor(
    private liSvc: LineItemService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Request ID from URL:', this.requestId);
    this.loadLineItems();
  }

  loadLineItems(): void {
    this.subscription.add(
      this.liSvc.listByRequestId(this.requestId).subscribe({
        next: (res) => {
          this.lineItems = res;
        },
        error: (err) => {
          console.error('Error loading line items:', err);
        }
      })
    );
  }

  reject(): void {
    if (!this.reasonForRejection.trim()) {
      alert('Please enter a reason for rejection.');
      return;
    }

      this.requestSvc.reject(this.requestId, this.reasonForRejection).subscribe({
        next: () => {
          console.log('Request rejected');
          this.router.navigateByUrl('/request-review');
        },
        error: (err) => {
          console.error('Error rejecting request:', err);
          alert('Failed to reject the request.');
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}