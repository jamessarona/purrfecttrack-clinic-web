import { ContactModel } from "./contact.model";

export interface VetStaffModel extends ContactModel{
    position?: string | null,
    department?: string | null,
    employmentDate?: string | null,
    companyId?: string | null
}
