import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanLoad,
  Router,
  Route
} from '@angular/router';

import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  // checkAdmin(url: string): boolean {
  //    if (this.authService)
  // }
}
