import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';

interface LoginResponse {
  sessionId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_LOGIN = 'auth/login';
  private readonly API_LOGOUT = 'auth/logout';
  private readonly API_REFRESH = 'auth/refresh';
  private readonly API_SESSION = 'auth/session';

  private sessionRequest$?: Observable<any>;
  private isSessionValid = false;

  constructor(private api: ApiService) {}

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(this.API_LOGIN, { email, password, rememberMe }).pipe(
      tap(() => {
        this.clearSessionCache();
      }),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): Observable<any> {
    return this.api.post<any>(this.API_LOGOUT, {}).pipe(
      tap(() => {
        this.clearSessionCache();
      }),
      catchError((err) => throwError(() => err))
    );
  }

  refreshToken(): Observable<any> {
    return this.api.post<any>(this.API_REFRESH, {}).pipe(
      catchError((err) => throwError(() => err))
    );
  }

  checkSession(): Observable<boolean> {
    if (this.sessionRequest$) {
      return this.sessionRequest$;
    }

    this.sessionRequest$ = this.api.get<any>(this.API_SESSION).pipe(
      tap(() => this.isSessionValid = true),
      map(() => true),
      catchError((err) => {
        this.isSessionValid = false;
        return of(false);
      }),
      shareReplay(1)
    );

    return this.sessionRequest$;
  }

  private clearSessionCache() {
    this.sessionRequest$ = undefined;
    this.isSessionValid = false;
  }
}