import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { UserDetailModel } from '../../core/models/user-detail.model';
import { ApiService } from '../../core/services/api.service';
import { VetModel } from '../../core/models/vet.model';
import { VetStaffModel } from '../../core/models/vet-staff.model';
import { UserRole } from '../../core/models/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_CURRENT_USER_DETAIL = 'users/current';
  private static readonly VET_ENDPOINT = 'vet';
  private static readonly VETSTAFF_ENDPOINT = 'vetStaff';

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


  updateUserDetails(updatedData: { vet?: VetModel | null; vetStaff?: VetStaffModel | null }): Observable<any> {
    const user = this.getUser();
    if (!user) {
      return throwError(() => new Error('User not loaded'));
    }

    switch (user.role) {
      case UserRole.Vet:
        return this.updateVet(user, updatedData.vet);
      case UserRole.VetStaff:
        return this.updateVetStaff(user, updatedData.vetStaff);
      default:
        return throwError(() => new Error('User role not authorized to update details'));
    }
  }

  private updateVet(user: UserDetailModel, vetData?: VetModel | null): Observable<any> {
    if (!vetData) {
      return throwError(() => new Error('No Vet data provided'));
    }
    const vetId = user.vet?.id;
    if (!vetId) {
      return throwError(() => new Error('Vet ID missing'));
    }
    return this.api.put(`${UserService.VET_ENDPOINT}/${vetId}`, vetData);
  }

  private updateVetStaff(user: UserDetailModel, vetStaffData?: VetStaffModel | null): Observable<any> {
    if (!vetStaffData) {
      return throwError(() => new Error('No VetStaff data provided'));
    }
    const vetStaffId = user.vetStaff?.id;
    if (!vetStaffId) {
      return throwError(() => new Error('VetStaff ID missing'));
    }
    return this.api.put(`${UserService.VETSTAFF_ENDPOINT}/${vetStaffId}`, vetStaffData);
  }
}