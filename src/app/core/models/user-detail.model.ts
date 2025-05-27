import { PetOwnerModel } from "./pet-owner.model";
import { UserRole } from "./user-role.enum";
import { VetStaffModel } from "./vet-staff.model";
import { VetModel } from "./vet.model";

export interface UserDetailModel {
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    petOwner?: PetOwnerModel;
    vet?: VetModel;
    vetStaff?: VetStaffModel;
    
}