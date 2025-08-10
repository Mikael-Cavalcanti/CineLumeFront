import {ProfileRepository} from "@/services/profile/profile.repository";
import {CreateProfileDto, Profile} from "@/interfaces/profile";

export class ProfileService {
    private repository: ProfileRepository;

    constructor() {
        this.repository = new ProfileRepository();
    }

    async getProfiles(): Promise<Profile[]> {
        return this.repository.getProfiles();
    }

    async createProfile(dto: CreateProfileDto): Promise<Profile> {
        return this.repository.createProfile(dto);
    }
}