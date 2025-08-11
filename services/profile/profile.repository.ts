import {CreateProfileDto, Profile, UpdateProfileDto} from "@/interfaces/profile";
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

    async updateProfile(id: number, dto: UpdateProfileDto): Promise<Profile> {
        const {data} = await api.put(`/profiles/${id}`, dto);
        return data;
    }

    async deleteProfile(id: number): Promise<Profile> {
        return await api.delete(`/profiles/${id}`);
    }

    async getProfile(id: number): Promise<Profile> {
        const {data} = await api.get(`/profiles/${id}`);
        return data;
    }
}