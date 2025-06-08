import { Injectable, NgZone } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserDetailModel } from '../../core/models/user-detail.model';
import { UserRole } from '../../core/models/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private zone: NgZone
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const allowedRoles: UserRole[] = route.data?.['roles'] ?? [];

    return this.userService.user$.pipe(
      switchMap(user => {
        if (!user) {
          return this.userService.loadUser().pipe(
            map(res => res.userDetail),
            map(userDetail => this.checkRole(userDetail, allowedRoles)),
            catchError(() => of(this.router.createUrlTree(['/login'])))
          );
        }
        return of(this.checkRole(user, allowedRoles));
      })
    );
  }

    private checkRole(user: UserDetailModel, allowedRoles: UserRole[]): boolean | UrlTree {
    if (user && allowedRoles.includes(user.role)) {
        return true;
    }

    return this.router.createUrlTree(['/unauthorized']);
    }
}
