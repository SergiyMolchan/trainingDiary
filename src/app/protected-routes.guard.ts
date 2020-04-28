import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthorizationService} from './authorization/authorization.service';

@Injectable({providedIn: 'root'})
export class ProtectedRoutes implements CanActivate{
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authorizationService.isAuth()) {
        return true;
    } else {
      this.authorizationService.logout();
      this.router.navigate(['/authorization'], {
        queryParams: {
          auth: false
        }
      });
    }
  }
}
