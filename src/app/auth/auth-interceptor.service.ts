import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
// this class intercepts ALL http requests to manipulate the data to add a JWT token
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /* i am taking that last value from the user observable only once,
     *  when the take completes, the exhaust map returns a new observable
     In the exhaust map i can now edit the request based on the user    
     I can then edit the request to modify it to apend the token to all requests */
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // this check to see if there is an existing user, if not, it sends the original request and does not modify it
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          // this is where I am setting the token to the request
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
