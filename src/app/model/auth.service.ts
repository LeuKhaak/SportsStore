import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';
//import { Observable } from "rxjs/Observable";
import { RestDataSource } from './rest.datasource';
//import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {
  constructor(private datasource: RestDataSource) {}
  authenticate(username: string, password: string): Rx.Observable<boolean> {
    return this.datasource.authenticate(username, password);
  }
  get authenticated(): boolean {
    return this.datasource.auth_token != null;
  }
  clear() {
    this.datasource.auth_token = ''; // this.datasource.auth_token = null; - ошибка
  }
}
