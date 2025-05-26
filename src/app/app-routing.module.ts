import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './layouts/base-layout/base-layout.component';
import { AuthGuard } from './services/auth.guard';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      // { path: 'pet-record', component: PetRecordComponent },
    ],
  }
];