import { Vendor } from "./vendor";

export class Product {
    id: number;
    vendor: Vendor;
    partNumber: string;
    productName: string;
    price: number;
    unit: string;
    photoPath: string;
  
    constructor(
      id: number = 0,
      vendor: any = null,
      partNumber: string = '',
      productName: string = '',
      price: number = 0.0,
      unit: string = '',
      photoPath: string = ''
    ) {
      this.id = id;
      this.vendor = vendor;
      this.partNumber = partNumber;
      this.productName = productName;
      this.price = price;
      this.unit = unit;
      this.photoPath = photoPath;
    }
  
    details(): string {
      return `Product: ${this.partNumber} - ${this.productName} ($${this.price})`;
    }
  }
  