import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common'; 
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [RouterModule, NgIf, NavbarComponent],
})
export class HomeComponent {
  isLoggingOut = false;
  logoutError = '';

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.isLoggingOut = true;
    this.logoutError = '';
    this.auth.logout().subscribe({
      next: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoggingOut = false;
        this.logoutError = 'Logout failed. Redirecting...';
        this.router.navigate(['/login']);
      },
    });
  }
}