import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  error = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = '';
    this.isLoading = true;
    this.auth.login(this.email, this.password, this.rememberMe).subscribe({
      next: () => {
        this.auth.checkSession().subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/home']);
          },
          error: () => {
            this.isLoading = false;
            this.error = 'Session validation failed after login.';
          }
        });
      },
      error: () => {
        this.isLoading = false;
        this.error = 'Invalid email or password';
      }
    });
  }
}
