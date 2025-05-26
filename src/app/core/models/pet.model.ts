export interface PetModel {
    id: string,
    petOwnerId: string,
    name: string,
    species?: string | null,
    breed?: string | null,
    gender?: string | null,
    dateOfBirth: Date | null,
    weight?: number | null,
    color?: string | null
    isNeutered?: boolean | null,
    iamgeUrl?: string | null
}
