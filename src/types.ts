export interface Route {
  name: string;
  path: string;
  component: React.ComponentType;
  dropdown?: boolean;
  dropdownData?: any[];
  header: boolean;
  dropdownPath?: (data: any) => string;
  listKey?: (data: any) => string;
}

export interface Icon {
  size: number;
  className?: string;
}

export interface Episode {
  id: number;
  name: number;
  special_name: number;
  detail_name: string | null;
  full_name: string;
  film_name: string;
  slug: string;
  link: string;
  views: number;
  is_copyrighted: boolean | null;
  has_preview: boolean | null;
  thumbnail_small: string;
  thumbnail_medium: string;
  upcoming: boolean | null;
}

export interface Source extends Episode {
  videoSource: string;
}

export interface AnimeWatchInfo {
  id: number;
  episodes: Episode[];
  title: string;
  description: string;
}

export interface AnimeInfo {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  views: number;
  is_movie: false;
  time: string;
  genres: Genre[];
  subTeams: string[];
  description: string;
  episodes: Episode[];
}

export interface Anime {
  backgroundImage?: string;
  id: number;
  name: string;
  thumbnail: string;
  is_movie: boolean;
  time: string;
  description: string;
  genres?: Genre[];
  subTeams?: string[];
  slug: string;
  views: number;
  upcoming?: boolean;
}

export interface Genre {
  name: string;
  slug: string;
}

export interface Ranking {
  name: string;
  slug: string;
}

export interface Sort {
  name: string;
  slug: string;
}
