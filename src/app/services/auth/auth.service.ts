import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../core/services/api.service';

interface LoginResponse {
  sessionId: string;
  // no token in response (or can be omitted)
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_LOGIN = 'auth/login';
  private readonly API_LOGOUT = 'auth/logout';
  private readonly API_REFRESH = 'auth/refresh';
  private readonly API_SESSION = 'auth/session';

  constructor(private api: ApiService) {}

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(this.API_LOGIN, { email, password, rememberMe })
      .pipe(catchError(err => throwError(() => err)));
  }

  logout(): Observable<any> {
    return this.api.post<any>(this.API_LOGOUT, {})
      .pipe(catchError(err => throwError(() => err)));
  }

  refreshToken(): Observable<any> {
    return this.api.post<any>(this.API_REFRESH, {})
      .pipe(catchError(err => throwError(() => err)));
  }

  checkSession(): Observable<any> {
    return this.api.get<any>(this.API_SESSION)
      .pipe(catchError(err => throwError(() => err)));
  }
}
