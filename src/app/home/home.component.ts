import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `<h1>Welcome to Home Page</h1>`,
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent {}
