import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgIfContext } from '@angular/common';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.auth.user.pipe(take(1), exhaustMap(user => {
      console.log(user);
      if (!user) {
        return next.handle(req);
      }
      const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)
    });
      return next.handle(modifiedReq);
    }));
  }
}
