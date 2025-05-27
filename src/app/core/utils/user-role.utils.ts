import { UserRole } from "../models/user-role.enum";

export function getUserRoleLabel(role: UserRole): string {
  switch(role) {
    case UserRole.Administrator:
      return 'Admin';
    case UserRole.Vet:
      return 'Vet';
    case UserRole.VetStaff:
      return 'Vet Staff';
    default:
      return 'Unknown';
  }
}
