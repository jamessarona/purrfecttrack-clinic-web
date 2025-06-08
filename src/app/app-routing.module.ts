import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RedirectIfAuthGuard } from './services/auth/redirect-if-auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RoleGuard } from './services/auth/role.guard';
import { UserRole } from './core/models/user-role.enum';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, canActivate: [RedirectIfAuthGuard] },

  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard],
    data: { roles: [UserRole.Administrator, UserRole.Vet, UserRole.VetStaff] },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-profile', component: UserProfileComponent },
    ],
  },

  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '**', redirectTo: 'login' }
];