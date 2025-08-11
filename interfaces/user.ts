export interface User {
    id: number;
    name: string;
    email: string;
    birthDate: Date;
    isActive: boolean;
}

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    birthDate?: string;
}