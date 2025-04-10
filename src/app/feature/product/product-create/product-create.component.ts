import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  title: string = 'Product-Create';
  newProduct: Product = new Product();
  subscription!: Subscription;
  vendors: Vendor[] = [];

  constructor(private productSvc: ProductService, private router: Router, private vendorSvc: VendorService) {}

  ngOnInit(): void {
    this.vendorSvc.list().subscribe({
      next: (resp) => {
        this.vendors = resp;
        console.log('Loaded vendors:', this.vendors);
      },
      error: (err) => {
        console.log('Error loading vendors:', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  add(): void {
    this.subscription = this.productSvc.add(this.newProduct).subscribe({
      next: () => this.router.navigateByUrl('/product-list'),
      error: (err) => {
        console.log('Error adding product:', err);
        alert('Error adding product.');
      }
    });
  }
}
