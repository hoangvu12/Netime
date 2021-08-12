import axios from "axios";
import { API_URL } from "../constants";
import { Anime, AnimeInfo, AnimeWatchInfo, Source } from "../types";

const instance = axios.create({
  baseURL: API_URL,
});

export const getSlide = async (): Promise<Anime[]> => {
  const { data } = await instance.get("/slide");

  return data.data;
};

export const getTypeList = (slug: string) => getList("types", slug);
export const getGenreList = (slug: string) => getList("genres", slug);
export const getSeasonList = (slug: string) => getList("seasons", slug);

export const getList = async (
  category: string,
  slug: string
): Promise<Anime[]> => {
  const { data } = await instance.get(`/${category}/${slug}`);

  return data.data;
};

export const getInfo = async (slug: string): Promise<AnimeInfo> => {
  const { data } = await instance.get(`/info/${slug}`);

  return data.data;
};

export const getWatchInfo = async (slug: string): Promise<AnimeWatchInfo> => {
  const { data } = await instance.get(`/watch/${slug}`);

  return data.data;
};

export const getSource = async (hash: string, id: number): Promise<Source> => {
  const { data } = await instance.get("/source", { params: { hash, id } });

  return data.data;
};
