import { CompanyModel } from "./company.model";
import { ContactModel } from "./contact.model";

export interface VetStaffModel extends ContactModel{
    position?: string;
    department?: string;
    employmentDate?: string;
    companyId?: string;
    company?: CompanyModel;
}
