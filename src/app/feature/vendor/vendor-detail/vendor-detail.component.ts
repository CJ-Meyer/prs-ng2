import { Subscription } from "rxjs";
import { Vendor } from "../../../model/vendor";
import { VendorService } from "../../../service/vendor.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";



@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css'
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  
  title: string = 'Vendor-Detail';
  username!: string;
  vendor!: Vendor;
  subscription!: Subscription;

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((params) => {
      this.username = params['id'];
      this.subscription = this.vendorSvc.getById(this.username).subscribe({
        next: (resp) => {
          this.vendor = resp;
        },
        error: (err) => {
          console.log('Error retrieving vendor: ', err);
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete(): void {
    this.vendorSvc.delete(this.vendor.id).subscribe({
      next: () => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log('Error deleting vendor:', err);
      }
    });
  }
}
