export interface AuthBaseDTO {
    email: string
    password: string
}

export interface RegisterDTO extends AuthBaseDTO {
    name: string
    birthDate: string
}