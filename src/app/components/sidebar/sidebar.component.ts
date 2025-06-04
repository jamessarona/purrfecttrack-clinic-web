import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { UserDetailModel } from '../../core/models/user-detail.model';
import { getUserRoleLabel } from '../../core/utils/user-role.utils';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  baseUrl = environment.baseUrl;

  user$: Observable<UserDetailModel | null> = of(null);
  displayName$: Observable<string> = of('');
  profileImage$: Observable<string> = of('');
  roleLabel$: Observable<string> = of('');
  companyImage$: Observable<string> = of('');

  marketingMenu = [
    { label: 'Dashboard', icon: 'bi bi-grid', link: '/dashboard' },
    { label: 'Marketplace', icon: 'bi bi-cart3', link: '/marketplace' },
    { label: 'Orders', icon: 'bi bi-bag-check', link: '/orders' },
    { label: 'Tracking', icon: 'bi bi-truck', link: '/tracking' },
    { label: 'Customers', icon: 'bi bi-people', link: '/customers' },
    { label: 'Discounts', icon: 'bi bi-percent', link: '/discounts' }
  ];

  paymentsMenu = [
    { label: 'Ledger', icon: 'bi bi-journal-text', link: '/ledger' },
    { label: 'Taxes', icon: 'bi bi-receipt-cutoff', link: '/taxes' }
  ];

  systemMenu = [
    { label: 'Settings', icon: 'bi bi-gear', link: '/settings' },
    { label: 'Dark mode', icon: 'bi bi-moon', link: '/dark-mode' }
  ];

  constructor(private userService: UserService) {
    this.checkWindowSize();
  }

  ngOnInit(): void {
    this.user$ = this.userService.user$;

    this.displayName$ = this.user$.pipe(
      map(user => {
        const firstName = user?.vet?.firstName ?? user?.vetStaff?.firstName ?? '';
        const lastName = user?.vet?.lastName ?? user?.vetStaff?.lastName ?? '';
        return `${firstName} ${lastName}`.trim();
      })
    );

    this.profileImage$ = this.user$.pipe(
      map(user => {
        const imageUrl = user?.vet?.imageUrl ?? user?.vetStaff?.imageUrl;
        return imageUrl ? this.baseUrl + imageUrl : 'assets/images/profile.png';
      })
    );

    this.roleLabel$ = this.user$.pipe(
      map(user => user ? getUserRoleLabel(user.role) : 'Unknown')
    );

    this.companyImage$ = this.user$.pipe(
      map(user => {
        const imageUrl = user?.vet?.company?.imageUrl ?? user?.vetStaff?.company?.imageUrl;
        return imageUrl ? this.baseUrl + imageUrl : 'assets/images/logo.png';
      })
    );
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowSize();
  }

  private checkWindowSize() {
    this.isCollapsed = window.innerWidth < 992;
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}