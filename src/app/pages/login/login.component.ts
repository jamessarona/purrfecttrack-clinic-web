import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule, NgClass],
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  error = '';
  isLoading = false;
  hidePassword = true;

  constructor(private auth: AuthService, private router: Router, 
    private user: UserService) {}

  login() {
    this.error = '';
    this.isLoading = true;
    this.auth.login(this.email, this.password, this.rememberMe).subscribe({
      next: () => {
        this.auth.checkSession().subscribe({
          next: () => {
            this.user.loadUser().subscribe({
              next: () => {
                this.isLoading = false;
                this.router.navigate(['/home']);
              },
              error: () => {
                this.isLoading = false;
                this.error = 'Fetching of user detail failed';
              }
            });
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

  togglePassword(){
    this.hidePassword = !this.hidePassword;
  }
}
