import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title: string = 'Product-Edit';
  productId!: number;
  product!: Product;
  subscription!: Subscription;

  constructor(private productSvc: ProductService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.subscription = this.productSvc.getById(this.productId).subscribe({
        next: (resp) => { this.product = resp; },
        error: (err) => { console.log('Error retrieving product:', err); }
      });
    });
  }

  update(): void {
    this.subscription = this.productSvc.update(this.product).subscribe({
      next: () => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.log('Error updating product:', err);
        alert('Error updating product.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
