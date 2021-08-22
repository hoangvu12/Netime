import axios from "axios";
import { API_URL } from "../constants";
import { Anime, AnimeInfo, Source } from "../types";

const instance = axios.create({
  baseURL: API_URL,
});

export const getSlide = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/slide");

  return data.data;
};

interface GetListResponse {
  success: boolean;
  data: Anime[];
  pagination: {
    totalPage: number;
    currentPage: number;
  };
}

interface GetListData {
  category: string;
  slug: string;
  page?: number;
  sort?: string;
}

export const getList = async ({
  category,
  slug,
  ...rest
}: GetListData): Promise<GetListResponse> => {
  const { data } = await instance.get(`/${category}/${slug}`, {
    params: rest,
  });

  return data;
};

interface SearchProps {
  q: string;
  limit: number;
  page: number;
}

export const search = async (props: SearchProps): Promise<GetListResponse> => {
  const { data } = await instance.get(`/search`, {
    params: props,
  });

  return data;
};

export const getInfo = async (slug: string): Promise<AnimeInfo> => {
  const { data } = await instance.get(`/anime/${slug}`);

  return data.data;
};

export const getSource = async (
  animeId: number,
  episodeIndex: number
): Promise<Source> => {
  const { data } = await instance.get(
    `/anime/${animeId}/episodes/${episodeIndex}`
  );

  return data.data;
};
