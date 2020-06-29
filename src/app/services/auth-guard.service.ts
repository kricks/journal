import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
  // url tree is used to redirect non-authenticated users from visitng blocked urls/routes
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
      // dont need to subscribe because user is already an observable
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        // !!user is a trick that converts a false-ish value like null or underfined to a true boolean, in this case, it is false
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
