import {Injectable} from "@angular/core";
import {Http, Request, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
import {Product} from "./product.model";
import {Cart} from "./cart.model";
import {Order} from "./order.model";
import {map} from 'rxjs/operators';

const PROTOCOL = "http";
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string = '';

  constructor(private http: Http) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    //this.auth_token = '';
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.request(new Request({
      method: RequestMethod.Post,
      url: this.baseUrl + "login",
      body: {name: user, password: pass}
    })).pipe(
      map((response: any) => {
        let r = response.json();
        this.auth_token = r.success ? r.token : null;
        return r.success;
      })
    );
  }

  getProducts(): Observable<Product[]> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Get, "products");
  }

  saveProduct(product: Product): Observable<Product> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Post, "products",
      product, true);
  }

  updateProduct(product: any): Observable<Product> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Put,
      `products/${product.id}`, product, true);
  }

  deleteProduct(id: number): Observable<Product> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Delete,

      `products/${id}`, null, true);
  }

  getOrders(): Observable<Order[]> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Get,
      "orders", null, true);
  }

  deleteOrder(id: number): Observable<Order> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Delete,
      `orders/${id}`, null, true);
  }

  updateOrder(order: Order): Observable<Order> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Put,
      `orders/${order.id}`, order, true);
  }

  saveOrder(order: Order): Observable<Order> {
    // @ts-ignore
    return this.sendRequest(RequestMethod.Post,
      "orders", order);
  }

  private sendRequest(verb: RequestMethod,
                      url: string, body?: Product | Order | null, auth: boolean = false)
    : Observable<Product | Product[] | Order | Order[]> {
    let request = new Request({
      method: verb,
      url: this.baseUrl + url,
      body: body
    });
    if (auth && this.auth_token != null) {
      request.headers.set("Authorization", `Bearer<${this.auth_token}>`);
    }
    return this.http.request(request).pipe(map(response => response.json()));
  }
}
