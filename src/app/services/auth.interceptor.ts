import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuthToken, selectIsLoggedIn } from '../reducers';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isLoggedIn: boolean;
  token: string;

  constructor(private store: Store<AppState>) {
    this.store.pipe(
      select(selectIsLoggedIn)
    ).subscribe(r => this.isLoggedIn = r);

    this.store.pipe(
      select(selectAuthToken)
    ).subscribe(r => this.token = r);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

}
