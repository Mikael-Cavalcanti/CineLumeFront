export interface CreateFavoriteDto {
  profileId: number;
  videoId: number;
}

export interface DeleteFavoriteDto {
  profileId: number;
  videoId: number;
}

export interface Favorite {
  profileId: number;
  videoId: number;
  video?: any; 
}
