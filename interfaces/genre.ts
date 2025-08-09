export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  title: string;
  description?: string;
  url?: string;
}


export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
