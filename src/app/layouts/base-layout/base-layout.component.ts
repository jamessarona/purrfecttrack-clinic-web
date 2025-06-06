import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  imports: [SidebarComponent, RouterModule, CommonModule],
})
export class BaseLayoutComponent {
  isLoading = true;

  constructor(private auth: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.auth.checkSession().subscribe({
      next: (valid) => {
        if (!valid) this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['/login']);
        this.isLoading = false;
      }
    });
  }
}
