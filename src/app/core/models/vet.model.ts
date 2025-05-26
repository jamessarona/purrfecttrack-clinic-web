import { ContactModel } from "./contact.model";

export interface VetModel extends ContactModel{
    licenseNumber?: string | null,
    licenseExpiryDate?: Date | null,
    specialication?: string | null,
    yearsOfExperience?: number | null,
    clinicName?: string | null,
    clinicAddress?: string | null,
    employmentDate?: Date | null,
    companyId?: string | null
}
