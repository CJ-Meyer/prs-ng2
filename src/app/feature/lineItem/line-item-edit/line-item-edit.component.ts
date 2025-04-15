import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LineItem } from '../../../model/line-item';
import { Product } from '../../../model/product';
import { LineItemService } from '../../../service/line-item.service';
import { ProductService } from '../../../service/product.service';
import { request } from 'express';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-line-item-edit',
  standalone: false,
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit, OnDestroy {
  title: string = 'LineItem-Edit';
  lineItemId!: number;
  lineItem!: LineItem;
  products!: Product[];
  subscription = new Subscription();
  isAdmin: boolean = false;
  constructor(
    private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private sysSvc: SystemService
  ) {}

    
  ngOnInit(): void {
    this.isAdmin = this.sysSvc.isAdmin();
    this.route.params.subscribe(params => {
      this.lineItemId = Number(params['id']);
  
      this.subscription.add(
        this.lineItemSvc.getById(this.lineItemId).subscribe({
          next: (res) => this.lineItem = res,
          error: (err) => console.error('Error loading line item:', err)
        })
      );
    });
  
    this.subscription.add(
      this.productSvc.list().subscribe({
        next: (res) => this.products = res,
        error: (err) => console.error('Error loading products:', err)
      })
    );
  }
  

  update(): void {
    this.subscription.add(
      this.lineItemSvc.update(this.lineItem).subscribe({
        next: () => this.router.navigateByUrl(`/request-lines/${this.lineItem.request.id}`),
        error: (err) => {
          console.error('Error updating line item:', err);
          alert('Error updating line item.');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compareProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}
