import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

const excludedUrls = ['auth/refresh', 'auth/login', 'auth/logout', 'auth/session'];

export const authRetryInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const isRetry = req.headers.get('x-retry');

  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRetry) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const retryReq = req.clone({ headers: req.headers.set('x-retry', 'true') });
            return next(retryReq);
          }),
          catchError(refreshError => {
            authService.forceLogout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};