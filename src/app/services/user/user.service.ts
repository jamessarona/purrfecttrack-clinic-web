import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { UserDetailModel } from '../../core/models/user-detail.model';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_CURRENT_USER_DETAIL = 'users/current';

  private userSubject = new BehaviorSubject<UserDetailModel | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private api: ApiService) {}

  loadUser(): Observable<{ userDetail: UserDetailModel }> {
    return this.api.get<{ userDetail: UserDetailModel }>(this.API_CURRENT_USER_DETAIL).pipe(
      tap(response => this.userSubject.next(response.userDetail)),
      catchError(error => {
        this.clearUser();
        return throwError(() => error);
      })
    );
  }

  getUser(): UserDetailModel | null {
    return this.userSubject.value;
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
}