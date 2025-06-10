import { CompanyModel } from "./company.model";
import { ContactModel } from "./contact.model";

export interface VetModel extends ContactModel{
    licenseNumber?: string;
    licenseExpiryDate?: Date;
    specialication?: string;
    yearsOfExperience?: number;
    clinicName?: string;
    clinicAddress?: string;
    employmentDate?: Date;
    companyId?: string;
    company?: CompanyModel;
}
