import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RedirectIfAuthGuard } from './services/auth/redirect-if-auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [RedirectIfAuthGuard] },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
    ],
  },
];