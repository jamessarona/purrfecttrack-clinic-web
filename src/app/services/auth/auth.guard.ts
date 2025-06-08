import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkAuth();
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.checkAuth();
  }

  private checkAuth(): Observable<boolean | UrlTree> {
    return this.auth.checkSession().pipe(
      map((isValid) => {
        console.log('[AuthGuard] Session valid:', isValid);
        return isValid || this.router.createUrlTree(['/login']);
      }),
      catchError((err) => {
        console.error('[AuthGuard] Error:', err);
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
