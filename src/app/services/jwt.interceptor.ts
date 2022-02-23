import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import store from '../redux/store';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (store.getState().productsState.auth){
    if (store.getState().productsState.auth.token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + store.getState().productsState.auth.token,
        },
      });
    }}
    return next.handle(request);
  }
}
