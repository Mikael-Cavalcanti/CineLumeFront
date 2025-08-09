export interface BaseFavoriteDto {
    profileId: number;
    videoId: number;
}

export interface Favorite extends BaseFavoriteDto {
    video?: any;
}
