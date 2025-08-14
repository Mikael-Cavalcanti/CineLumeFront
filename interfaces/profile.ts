export interface CreateProfileDto {
    name: string;
    avatarUrl?: string;
    isKidProfile: boolean;
}

export interface UpdateProfileDto extends Partial<CreateProfileDto> {
}

export interface Profile {
    id: number;
    name: string;
    userId: number;
    avatarUrl?: string;
    isKidsProfile: boolean;
}