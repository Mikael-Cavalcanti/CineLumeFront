export interface CreateProfileDto {
    name: string;
    avatarUrl?: string;
    isKidProfile: boolean;
    userId: number;
}

export interface UpdateProfileDto extends Partial<CreateProfileDto> {
    id: number;
}

export interface Profile {
    id: number;
    name: string;
    userId: number;
    avatarUrl?: string;
    isKidsProfile: boolean;
}