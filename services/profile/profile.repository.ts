import {CreateProfileDto, Profile, UpdateProfileDto} from "@/interfaces/profile";
import {api} from "@/lib/api";

export class ProfileRepository {

    async createProfile(dto: CreateProfileDto): Promise<Profile> {
        const {data} = await api.post('/profile/new', dto);
        return data;
    }

    async getProfiles(): Promise<Profile[]> {
        const {data} = await api.get('/profile/all');
        return data;
    }

    async getProfile(id: number): Promise<Profile> {
        const {data} = await api.get(`/profile/${id}`);
        return data;
    }

    async updateProfile(dto: UpdateProfileDto): Promise<Profile> {
        const {data} = await api.patch(`/profile/update`, dto);
        return data;
    }

    async deleteProfile(id: number): Promise<Profile> {
        return await api.delete(`/profile/delete/${id}`);
    }
}