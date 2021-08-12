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
  hash: string;
  id: number;
  name: string;
}

export interface Source {
  source: string;
  type: string;
}

export interface AnimeWatchInfo {
  id: number;
  episodes: Episode[];
  title: string;
  description: string;
}

export interface AnimeInfo {
  backgroundImage: string;
  title: string;
  altTitle: string;
  image: string;
  description: string;
  time: string;
  date: string;
  views: string;
  status?: string;
  showtime?: string;
  followers?: string;
  quality: string;
  rating?: string;
  language?: string;
  studio?: string;
  genres: Genre[];
  seasons: Season[];
  directors?: Director[];
  nations?: Nation[];
  relatedAnime: Anime[];
}

export interface Anime {
  stars: number;
  image: string;
  title: string;
  slug: string;
  views?: number | null;
  isCompleted?: boolean;
  isUpcoming?: boolean;
  upcomingYear?: string | null;
  totalEpisodes?: number | null;
  quality?: string;
  date?: string;
  time?: string;
  description?: string;
  studio?: string;
  genres?: Genre[] | null;
}

export interface Genre {
  name: string;
  slug: string;
}

export interface Sort {
  name: string;
  slug: string;
}

export interface Season {
  name: string;
  season: string;
  year: string;
}

export interface Type {
  name: string;
  slug: string;
}

export interface Nation {
  name: string;
  slug: string;
}

export interface Director {
  name: string;
  slug: string;
}
