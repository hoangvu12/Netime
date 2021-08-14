import { GENRES, SEASONS, TYPES } from "./constants";
import lazyLoading from "./utils/lazyLoading";

import { Genre, Route, Season, Type } from "./types";

const HomeScreen = lazyLoading(() => import("./pages/HomePage"));
const BrowseScreen = lazyLoading(() => import("./pages/BrowseScreen"));
const InfoScreen = lazyLoading(() => import("./pages/InfoScreen"));
const SearchScreen = lazyLoading(() => import("./pages/SearchScreen"));
const WatchScreen = lazyLoading(() => import("./pages/WatchScreen"));

const routes: Route[] = [
  {
    name: "Trang chủ",
    path: "/",
    component: HomeScreen,
    header: true,
    dropdown: false,
  },

  {
    name: "Định dạng",
    path: "/types/:slug",
    component: BrowseScreen,
    header: true,
    dropdown: true,
    dropdownData: TYPES,
    dropdownPath: (data: Type) => `/types/${data.slug}`,
    listKey: (data: Type) => data.slug,
  },
  {
    name: "Thể loại",
    path: "/genres/:slug",
    component: BrowseScreen,
    header: true,
    dropdown: true,
    dropdownData: GENRES,
    dropdownPath: (data: Genre) => `/genres/${data.slug}`,
    listKey: (data: Genre) => data.slug,
  },
  {
    name: "Mùa",
    path: "/seasons/:season/:year",
    component: BrowseScreen,
    header: true,
    dropdown: true,
    dropdownData: SEASONS,
    dropdownPath: (data: Season) => `/seasons/${data.season}/${data.year}`,
    listKey: (data: Season) => `${data.season}/${data.year}`,
  },
  {
    name: "Thông tin phim",
    path: "/info/:slug",
    component: InfoScreen,
    header: false,
  },
  {
    name: "Xem phim",
    path: "/watch/:slug",
    component: WatchScreen,
    header: false,
  },
  {
    name: "Tìm kiếm",
    path: "/search",
    component: SearchScreen,
    header: true,
  },
];

export default routes;
