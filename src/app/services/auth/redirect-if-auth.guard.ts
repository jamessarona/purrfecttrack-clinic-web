import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectIfAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.checkSession().pipe(
      map((isValid) => {
        console.log('[RedirectIfAuthGuard] Session valid:', isValid);
        return isValid ? this.router.createUrlTree(['/home']) : true;
      }),
      catchError((err) => {
        console.error('[RedirectIfAuthGuard] Error:', err);
        return of(true);
      })
    );
  }
}