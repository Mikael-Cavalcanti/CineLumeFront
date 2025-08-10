export interface CreateProfileDto {
    name: string;
    userId: number;
    avatarUrl?: string;
    isKidProfile: boolean;
}

export interface UpdateProfileDto extends Partial<CreateProfileDto> {
    name: string;
    avatarUrl?: string;
    isKidProfile: boolean;
}

export interface Profile {
    id: number;
    name: string;
    userId: number;
    avatarUrl?: string;
    isKidProfile: boolean;
    createdAt: string;
    updatedAt: string;
}