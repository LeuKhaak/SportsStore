import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.model';
import { Cart } from './cart.model';
import { Order } from './order.model';

const PROTOCOL = 'http';
const PORT = 3500;
@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token!: string;
  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }
  authenticate(user: string, pass: string): Rx.Observable<boolean> {
    return this.http
      .request(
        new Request({
          method: RequestMethod.Post,
          url: this.baseUrl + 'login',
          body: { name: user, password: pass },
        })
      )
      .pipe(
        map((response: any) => {
          let r = response.json();
          this.auth_token = r.success ? r.token : null;
          return r.success;
        })
      );
  }
  getProducts(): Rx.Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, 'products');
  }
  saveProduct(product: Product): Rx.Observable<Product[]> {
    return this.sendRequest(RequestMethod.Post, 'products', product, true);
  }
  updateProduct(product: any): Rx.Observable<Product[]> {
    return this.sendRequest(
      RequestMethod.Put,
      `products/${product.id}`,
      product,
      true
    );
  }
  deleteProduct(id: number): Rx.Observable<Product[]> {
    return this.sendRequest(
      RequestMethod.Delete,
      `products/${id}`,
      undefined,
      true
    ); // я заменил null на undefined, иначе - ошибка
  }
  getOrders(): Rx.Observable<Product[]> {
    return this.sendRequest(RequestMethod.Get, 'orders', undefined, true);
  }
  deleteOrder(id: number): Rx.Observable<Product[]> {
    return this.sendRequest(
      RequestMethod.Delete,
      `orders/${id}`,
      undefined,
      true
    );
  }
  updateOrder(order: Order): Rx.Observable<Product[]> {
    return this.sendRequest(
      RequestMethod.Put,
      `orders/${order.id}`,
      order,
      true
    );
  }
  saveOrder(order: Product): Rx.Observable<Product[]> {
    return this.sendRequest(RequestMethod.Post, 'orders', order);
  }

  private sendRequest(
    verb: RequestMethod,
    url: string,
    body?: Product | Order,
    auth: boolean = false
  ): Rx.Observable<Product[]> {
    let request = new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body,
    });
    if (auth && this.auth_token != null) {
      request.headers.set('Authorization', `Bearer<${this.auth_token}>`);
    }
    return this.http
      .request(request)
      .pipe(map((response: any) => response.json()));
  }
}
