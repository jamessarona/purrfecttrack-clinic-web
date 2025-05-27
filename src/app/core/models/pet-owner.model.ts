import { ContactModel } from "./contact.model";
import { PetModel } from "./pet.model";

export interface PetOwnerModel extends ContactModel{
    numberOfPets: number;
    pets: PetModel[];
}
