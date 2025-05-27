import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  sessionId: string;
  // no token in response (or can be omitted)
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_LOGIN = `${environment.apiBaseUrl}/auth/login`;
  private readonly API_LOGOUT = `${environment.apiBaseUrl}/auth/logout`;
  private readonly API_REFRESH = `${environment.apiBaseUrl}/auth/refresh`;
  private readonly API_SESSION = `${environment.apiBaseUrl}/auth/session`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string, rememberMe: boolean): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        this.API_LOGIN,
        { email, password, rememberMe },
        { withCredentials: true } // Important for cookie auth!
      )
      .pipe(
        catchError((err) => throwError(() => err))
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(this.API_LOGOUT, {}, { withCredentials: true })
      .pipe(catchError((err) => throwError(() => err)));
  }

  refreshToken(): Observable<any> {
    return this.http
      .post(this.API_REFRESH, {}, { withCredentials: true })
      .pipe(catchError((err) => throwError(() => err)));
  }
  
  checkSession(): Observable<any> {
    return this.http
      .get(this.API_SESSION, { withCredentials: true })
      .pipe(catchError(err => throwError(() => err)));
  }
}
