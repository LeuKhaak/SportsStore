import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { Cart } from './cart.model';
import { Order } from './order.model';
import 'rxjs/add/operator/map';
const PROTOCOL = 'http';
const PORT = 3500;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  getProducts(): Rx.Observable<Product | Order> {
    return this.sendRequest(RequestMethod.Get, 'products');
  }
  saveOrder(order: Product): Rx.Observable<Product | Order> {
    return this.sendRequest(RequestMethod.Post, 'orders', order);
  }
  private sendRequest(
    verb: RequestMethod,
    url: string,
    body?: Product | Order
  ): Rx.Observable<Product | Order> {
    return this.http
      .request(
        new Request({
          method: verb,
          url: this.baseUrl + url,
          body: body,
        })
      )
      .pipe(map((response: any) => response.json()));
  }
}
