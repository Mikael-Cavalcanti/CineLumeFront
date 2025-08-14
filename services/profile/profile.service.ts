import {ProfileRepository} from "@/services/profile/profile.repository";
import {CreateProfileDto, Profile, UpdateProfileDto} from "@/interfaces/profile";

export class ProfileService {
    private repository: ProfileRepository;

    constructor() {
        this.repository = new ProfileRepository();
    }

    async createProfile(dto: CreateProfileDto): Promise<Profile> {
        return this.repository.createProfile(dto);
    }

    async getProfiles(): Promise<Profile[]> {
        return this.repository.getProfiles();
    }

    async getProfile(id: number): Promise<Profile> {
        return this.repository.getProfile(id);
    }

    async updateProfile(dto: UpdateProfileDto): Promise<Profile> {
        return this.repository.updateProfile(dto);
    }

    async deleteProfile(id: number): Promise<Profile> {
        return this.repository.deleteProfile(id);
    }
}