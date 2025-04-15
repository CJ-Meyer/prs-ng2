import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { LineItem } from '../../../model/line-item';
import { RequestService } from '../../../service/request.service';
import { LineItemService } from '../../../service/line-item.service';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit, OnDestroy {

  title: string = 'Request-Lines';
  subscription!: Subscription;
  requestId: number = 0;
  request!: Request;
  product!: Product[];
  requests!: Request[];
  lineItems!: LineItem[];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestSvc: RequestService,
    private liSvc: LineItemService,
  ) {}
  delete(id: number): void {
    this.subscription = this.liSvc.delete(id).subscribe({
      next: () => {
        this.refreshLines();
      },
      error: (err) => {
        console.log('Error deleting Line Item for id: ' + id);
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];

      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: res => {
          this.request = res;
          console.log('RLC.request - ', this.request);
        },
        error: err => console.error('Error loading request:', err)
      });

      this.subscription = this.liSvc.listByRequestId(this.requestId).subscribe({
        next: res => {
          this.lineItems = res;
          console.log('RLC.lineItems - ', this.lineItems);
        },
        error: err => console.error('Error loading line items:', err)
      });
    });

    this.subscription = this.requestSvc.list().subscribe({
      next: res => {
        this.requests = res;
        console.log('RLC.requests - ', this.requests);
      },
      error: err => console.error('Error loading requests:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compRequest(a: Request, b: Request): boolean {
    return a && b && a.id === b.id;
  }

  refreshLines(): void {
    this.subscription = this.liSvc
      .listByRequestId(this.request.id)
      .subscribe({
        next: (res) => {
          this.lineItems = res;
          console.log('RLC.lineItems refreshed - ', this.lineItems);
        },
        error: (err) => {
          console.log('Error refreshing line items:', err);
        }
      });
  }
  submit(): void {
    console.log('Submitting request with ID:', this.request?.id);
  
    if (!this.request?.id) {
      console.error('No request ID available.');
      return;
    }
  
      this.requestSvc.submitForReview(this.request.id).subscribe({
        next: (updated) => {
          console.log('Request submitted:', updated);
          this.router.navigateByUrl('/request-list');
        },
        error: (err) => {
          console.error('Error submitting request:', err);
          alert('Failed to submit request.');
        }
      });
  }
  
  
}
