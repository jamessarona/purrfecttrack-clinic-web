export interface ContactModel {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    address?: string;
    dateOfBirth?: Date;
    gender?: string;
    imageUrl?: string;
}