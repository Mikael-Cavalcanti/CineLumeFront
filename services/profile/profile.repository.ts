import {CreateProfileDto, Profile} from "@/interfaces/profile";
import {api} from "@/lib/api";

export class ProfileRepository {

    async getProfiles(): Promise<Profile[]> {
        const {data} = await api.get('/profiles');
        return data;
    }

    async createProfile(dto: CreateProfileDto): Promise<Profile> {
        const {data} = await api.post('/profiles', dto);
        return data;
    }
}