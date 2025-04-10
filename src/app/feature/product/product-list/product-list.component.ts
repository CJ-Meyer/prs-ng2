import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  title: string = 'Product-List';
  products!: Product[];
  subscription!: Subscription;
  isAdmin: boolean = false;
  loggedInUser!: User;
  welcomeMsg!: string;

  constructor(private productSvc: ProductService, private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.isAdmin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.loadProducts();
  }

  loadProducts(): void {
    this.subscription = this.productSvc.list().subscribe((resp) => {
      this.products = resp;
    });
  }

  delete(id: number): void {
    this.subscription = this.productSvc.delete(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.log('Error deleting product for id: ' + id);
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}