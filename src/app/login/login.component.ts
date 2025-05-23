import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';  
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.hasSession()) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => (this.error = 'Invalid email or password'),
    });
  }
}
