import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-request-edit',
  standalone: false,
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit, OnDestroy {
  title: string = 'Request-Edit';
  request!: Request;
  requestId!: number;
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

  save(): void {
    this.subscription = this.requestSvc.update(this.request).subscribe({
      next: () => this.router.navigateByUrl('/request-list'),
      error: (err) => console.error('Error saving request:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
