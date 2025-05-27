export interface PetModel {
    id: string;
    petOwnerId: string;
    name: string;
    species?: string;
    breed?: string;
    gender?: string;
    dateOfBirth: Date;
    weight?: number;
    color?: string;
    isNeutered?: boolean;
    iamgeUrl?: string;
}
