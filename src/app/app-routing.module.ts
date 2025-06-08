import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RedirectIfAuthGuard } from './services/auth/redirect-if-auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [RedirectIfAuthGuard] },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-profile', component: UserProfileComponent}
    ],
  },
];