import { GENRES, RANKINGS } from "./constants";
import { Genre, Ranking, Route } from "./types";
import lazyLoading from "./utils/lazyLoading";

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
    name: "Top Anime",
    path: "/ranking/:slug",
    component: BrowseScreen,
    header: true,
    dropdown: true,
    dropdownData: RANKINGS,
    dropdownPath: (data: Ranking) => `/ranking/${data.slug}`,
    listKey: (data: Ranking) => data.slug,
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
