import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
@Injectable()
export class Order {
  // @ts-ignore
  public id: number;
  public name?: string;
  public address?: string;
  public city!: string | null;
  public state!: string | null;
  public zip!: string | null;
  public country!: string | null;
  public shipped: boolean = false;
  constructor(public cart: Cart) {  }
  clear() {
    // @ts-ignore
    this.id = null;
    // @ts-ignore
    this.name = this.address = this.city = null;
    this.state = this.zip = this.country = null;
    this.shipped = false;
    this.cart.clear();
  }
}
