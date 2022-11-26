import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { AuthService } from './auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import toastr from "toastr";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private environmentAuth: any;

  constructor(
    private auth: AuthService,
    private route: Router) {
    this.environmentAuth = environment.security;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isAuthenticated()) {
      request = this.buildRequestHeaderAuthorization(request);
    }

    return next.handle(request);
  }

  private buildRequestHeaderAuthorization(request: HttpRequest<any>): any {
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${this.auth.getUserToken()}`
        },
    });

}
}
