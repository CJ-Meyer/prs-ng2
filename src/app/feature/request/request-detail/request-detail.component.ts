import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title: string = 'Request-Detail';
  requestId!: number;
  request!: Request;
  subscription!: Subscription;

  constructor(
    private requestSvc: RequestService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.requestId = +params['id'];
      this.subscription = this.requestSvc.getById(this.requestId).subscribe({
        next: (resp) => {
          this.request = resp;
        },
        error: (err) => {
          console.error('Error loading request:', err);
        }
      });
    });
  }

  delete(): void {
    this.subscription = this.requestSvc.delete(this.requestId).subscribe({
      next: () => this.router.navigateByUrl('/request-list'),
      error: (err) => console.error('Error deleting request:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
