import { UserRole } from "./user-role.enum";

export interface UserModel {
    id: string,
    email: string,
    userRole: UserRole,
    isActive: boolean
}