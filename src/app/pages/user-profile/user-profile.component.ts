import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { UserDetailModel } from '../../core/models/user-detail.model';
import { VetModel } from '../../core/models/vet.model';
import { VetStaffModel } from '../../core/models/vet-staff.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user!: UserDetailModel | null;

  vetData!: VetModel | null;
  vetStaffData!: VetStaffModel | null;

  originalVetData!: VetModel | null;
  originalVetStaffData!: VetStaffModel | null;

  saveEnabled = false;

  // Flattened properties for template binding
  firstName = '';
  lastName = '';
  phoneNumber = '';
  companyWebsite = '';
  clinicName = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.vetData = user?.vet ? { ...user.vet } : null;
      this.vetStaffData = user?.vetStaff ? { ...user.vetStaff } : null;

      this.originalVetData = user?.vet ? { ...user.vet } : null;
      this.originalVetStaffData = user?.vetStaff ? { ...user.vetStaff } : null;

      // Initialize flattened fields from nested models
      if (this.vetData) {
        this.firstName = this.vetData.firstName || '';
        this.lastName = this.vetData.lastName || '';
        this.phoneNumber = this.vetData.phoneNumber || '';
        this.clinicName = this.vetData.clinicName || '';
        this.companyWebsite = this.vetData.company?.website || '';
      } else if (this.vetStaffData) {
        this.firstName = this.vetStaffData.firstName || '';
        this.lastName = this.vetStaffData.lastName || '';
        this.phoneNumber = this.vetStaffData.phoneNumber || '';
        // this.clinicName = this.vetStaffData.clinicName || '';
        this.companyWebsite = this.vetStaffData.company?.website || '';
      } else {
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.clinicName = '';
        this.companyWebsite = '';
      }

      this.saveEnabled = false;
    });
  }

  onFieldChange() {
    // Update nested models from flat fields before comparison
    if (this.vetData) {
      this.vetData.firstName = this.firstName;
      this.vetData.lastName = this.lastName;
      this.vetData.phoneNumber = this.phoneNumber;
      this.vetData.clinicName = this.clinicName;
      // if (!this.vetData.company) this.vetData.company = {};
      // this.vetData.company.website = this.companyWebsite;
    }

    if (this.vetStaffData) {
      this.vetStaffData.firstName = this.firstName;
      this.vetStaffData.lastName = this.lastName;
      this.vetStaffData.phoneNumber = this.phoneNumber;
      // this.vetStaffData.clinicName = this.clinicName;
      // if (!this.vetStaffData.company) this.vetStaffData.company = {};
      // this.vetStaffData.company.website = this.companyWebsite;
    }

    this.saveEnabled = !this.isEqual(this.vetData, this.originalVetData) || !this.isEqual(this.vetStaffData, this.originalVetStaffData);
  }

  private isEqual(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  save() {
    if (!this.user) return;

    const updatedData = {
      vet: this.vetData,
      vetStaff: this.vetStaffData
    };

    this.userService.updateUserDetails(updatedData).subscribe({
      next: () => {
        this.originalVetData = this.vetData ? { ...this.vetData } : null;
        this.originalVetStaffData = this.vetStaffData ? { ...this.vetStaffData } : null;
        this.saveEnabled = false;
        alert('Profile saved successfully!');
      },
      error: (err) => {
        console.error('Save failed', err);
        alert('Failed to save profile.');
      }
    });
  }
}