import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { LineItemService } from '../../../service/line-item.service';

@Component({
  selector: 'app-line-item-detail',
  standalone: false,
  templateUrl: './line-item-detail.component.html',
  styleUrls: ['./line-item-detail.component.css']
})
export class LineItemDetailComponent implements OnInit, OnDestroy {
  title: string = 'LineItem Detail';
  lineItemId!: number;
  lineItem!: LineItem;
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private lineItemSvc: LineItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lineItemId = params['id'];
      this.subscription.add(
        this.lineItemSvc.getById(this.lineItemId).subscribe({
          next: res => {
            this.lineItem = res;
            console.log('LineItem Detail Loaded:', res);
          },
          error: err => {
            console.error('Error loading line item:', err);
            this.router.navigateByUrl('/line-item-list');
          }
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
