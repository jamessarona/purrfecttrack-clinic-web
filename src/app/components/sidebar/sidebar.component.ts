import { Component, HostListener } from '@angular/core';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, map } from 'rxjs';

import { UserService } from '../../services/user/user.service';
import { getUserRoleLabel } from '../../core/utils/user-role.utils';
import { environment } from '../../../environments/environment';
import { UserDetailModel } from '../../core/models/user-detail.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  baseUrl = environment.baseUrl;

  user$: Observable<UserDetailModel | null>;
  displayName$: Observable<string>;
  profileImage$: Observable<string>;
  roleLabel$: Observable<string>;
  companyImage$: Observable<string>;

  menuItems = [
    { label: 'Dashboard', link: '/home', icon: 'bi bi-speedometer2' },
    { label: 'Task List', link: '/tasks', icon: 'bi bi-list-task' },
    { label: 'Project List', link: '/projects', icon: 'bi bi-kanban' },
    { label: 'Time Tracking', link: '/time-tracking', icon: 'bi bi-clock' },
  ];

  constructor(private userService: UserService) {
    this.user$ = this.userService.user$;

    this.displayName$ = this.user$.pipe(
      map(user => {
        if (!user) 
          return '';
        const firstName = user.vet?.firstName ?? user.vetStaff?.firstName ?? '';
        const lastName = user.vet?.lastName ?? user.vetStaff?.lastName ?? '';
        return `${firstName} ${lastName}`.trim();
      })
    );

    this.profileImage$ = this.user$.pipe(
      map(user => {
        if (!user) 
          return 'assets/images/profile.png';
        const imageUrl = user.vet?.imageUrl ?? user.vetStaff?.imageUrl;
        return imageUrl ? this.baseUrl + imageUrl : 'assets/images/profile.png';
      })
    );

    this.roleLabel$ = this.user$.pipe(
      map(user => user ? getUserRoleLabel(user.role) : 'Unknown')
    );

    this.companyImage$ = this.user$.pipe(
      map(user => {
        if (!user) 
          return 'assets/images/logo.png';
        const imageUrl = user.vet?.company?.imageUrl ?? user.vetStaff?.company?.imageUrl;
        return imageUrl ? this.baseUrl + imageUrl : 'assets/images/logo.png';
      })
    );

    this.checkWindowSize();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }

  private checkWindowSize() {
    this.isCollapsed = window.innerWidth < 992;
  }
}
