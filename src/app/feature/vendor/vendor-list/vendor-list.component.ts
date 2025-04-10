import { Component, OnInit, OnDestroy } from '@angular/core';
import { VendorService} from '../../../service/vendor.service';

import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent implements OnInit, OnDestroy {
  title: string = 'Vendor-List';
  vendors!: Vendor[];
  subscription!: Subscription;
  welcomeMsg!: string;
  loggedInUser!: User;
  isAdmin: boolean = false;
  
  loadVendors(): void {
    this.subscription = this.vendorSvc.list().subscribe((resp) => {
      this.vendors = resp;
    });
  }

  delete(id: number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        this.subscription = this.vendorSvc.list().subscribe((resp) => {
          this.vendors = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting vendor for id: '+id);
        alert('Error deleting vendor for id: '+id);
      }
    });
  }
  constructor(private vendorSvc: VendorService, private sysSvc: SystemService) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.isAdmin = this.loggedInUser.isAdmin;
    this.welcomeMsg = `Hello, ${this.loggedInUser.firstName}!`;
    this.subscription = this.vendorSvc.list().subscribe((resp) => {
      this.vendors = resp;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
