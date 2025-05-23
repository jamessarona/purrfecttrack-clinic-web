import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

let isRefreshing = false;
const tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !authReq.url.includes('/auth/login') &&
        !authReq.url.includes('/auth/refresh')
      ) {
        return handle401Error(authReq, next, auth);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  auth: AuthService
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;
    tokenSubject.next(null);

    return auth.refreshToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        tokenSubject.next(res.accessToken);
        return next(request.clone({
          setHeaders: { Authorization: `Bearer ${res.accessToken}` }
        }));
      }),
      catchError((err) => {
        isRefreshing = false;
        auth.clearTokens();
        return throwError(() => err);
      })
    );
  } else {
    return tokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next(request.clone({
        setHeaders: { Authorization: `Bearer ${token!}` }
      })))
    );
  }
}