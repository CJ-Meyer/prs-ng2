import { Subscription } from "rxjs";
import { Vendor } from "../../../model/vendor";
import { VendorService } from "../../../service/vendor.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { SystemService } from "../../../service/system.service";



@Component({
  selector: 'app-vendor-edit',
  standalone: false,
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css'
})
export class VendorEditComponent implements OnInit, OnDestroy {
  
  title: string = 'Vendor-edit';
  username!: string;
  vendor!: Vendor;
  subscription!: Subscription;
  isAdmin: boolean = false;
  states: string[] = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  constructor(
    private vendorSvc: VendorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private sysSvc: SystemService
  ) {}

    ngOnInit(): void {
    this.isAdmin = this.sysSvc.isAdmin();
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
  save() {
    this.vendorSvc.update(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log('error saving vendor', err);
      },
    });
  }
  
}
