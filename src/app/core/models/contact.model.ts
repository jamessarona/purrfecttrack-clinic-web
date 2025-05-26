import { UserModel } from "./user.model";

export interface ContactModel {
    id: string,

    userId: string,
    user?: UserModel | null,

    firstName: string,
    lastName: string,
    phoneNumber?: string | null,
    address?: string | null,
    dateOfBirth?: Date | null,
    gender?: string | null,
    imageUrl?: string | null
}
