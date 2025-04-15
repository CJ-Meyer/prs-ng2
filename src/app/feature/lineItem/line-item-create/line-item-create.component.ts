import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { LineItem } from '../../../model/line-item';
import { ProductService } from '../../../service/product.service';
import { LineItemService } from '../../../service/line-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrl: './line-item-create.component.css',
  standalone: false,
})
export class LineItemCreateComponent implements OnInit, OnDestroy {
  products!: Product[];
  newlineItem: LineItem = new LineItem();
  title: string = 'LineItem-Create';
  welcomeMsg!: string;
  loggedInUser!: User;
  subscription!: Subscription;
  requestId!: number;
  
  constructor(
    private productSvc: ProductService,
    private lineItemSvc: LineItemService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.route.paramMap.subscribe((params) => {
      this.requestId = Number(params.get('id'));
      this.newlineItem.request.id = this.requestId;
    });
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
      this.productSvc.list().subscribe({
        next: res => {this.products = res, console.log('request Id:', this.newlineItem.request.id)},
        error: err => console.error('Error loading products:', err)
      })
    ;
  }

  add(): void {
    this.subscription = this.lineItemSvc.add(this.newlineItem).subscribe((resp) => {
      this.router.navigateByUrl('/request-lines/' + this.newlineItem.request.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compareProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
}
