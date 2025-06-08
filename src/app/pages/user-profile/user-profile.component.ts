import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ REQUIRED for [(ngModel)]

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ MUST include FormsModule
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  // Editable fields
  firstName = 'Cameron';
  lastName = 'Williamson';
  email = 'comeronwilliamson@hotmail.com';
  phone = '(629) 555-0129';

  facebook = 'https://www.facebook.com/comeronw';
  instagram = 'https://www.instagram.com/comeronw';
  wallet = 'https://wpshout.com/';
  enterprise = 'https://www.';
}