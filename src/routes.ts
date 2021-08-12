import { GENRES, SEASONS, TYPES } from "./constants";
import HomePage from "./pages/HomePage";
import BrowseScreen from "./pages/BrowseScreen";
import { Genre, Route, Season, Type } from "./types";
import InfoScreen from "./pages/InfoScreen";
import WatchScreen from "./pages/WatchScreen";

const routes: Route[] = [
  {
    name: "Trang chủ",
    path: "/",
    component: HomePage,
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
];

export default routes;
