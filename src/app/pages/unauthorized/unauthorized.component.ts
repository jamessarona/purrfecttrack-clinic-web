import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
})
export class UnauthorizedComponent implements OnInit {
  countdown = 5;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: () => this.startCountdown(),
      error: () => this.startCountdown(),
    });
  }

  private startCountdown() {
    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/login']);
      }
    }, 1000);
  }
}