import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService implements CanActivate {
  constructor(private cs: CookieService, private rt: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.cs.get('ep_delivery_cookie')) {
      return true;
    } else {
      this.rt.navigateByUrl('login');
      return false;
    }
  }
}
