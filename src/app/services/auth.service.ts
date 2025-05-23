import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  token: string;
  sessionId: string;
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_LOGIN = `${environment.apiBaseUrl}/auth/login`;
  private readonly API_REFRESH = `${environment.apiBaseUrl}/auth/refresh`;
  private readonly API_LOGOUT = `${environment.apiBaseUrl}/auth/logout`;

  private tokenKey = 'session_token';
  private refreshTokenKey = 'refresh_token';

  private isRefreshing = false;
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<LoginResponse>(this.API_LOGIN, { email, password }).pipe(
      tap((res) => this.setTokens(res.token, res.refreshToken)),
      catchError((err) => throwError(() => err))
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.API_LOGOUT, {}, { headers }).pipe(
      tap(() => this.clearTokens()),
      catchError((err) => throwError(() => err))
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    return this.http.post<RefreshResponse>(this.API_REFRESH, { refreshToken }).pipe(
      tap((res) => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.tokenSubject.next(res.accessToken);
      }),
      catchError((err) => {
        this.clearTokens();
        return throwError(() => err);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setTokens(token: string, refreshToken: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  clearTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  hasSession(): boolean {
    return !!this.getToken();
  }

  getTokenSubject(): BehaviorSubject<string | null> {
    return this.tokenSubject;
  }
}
