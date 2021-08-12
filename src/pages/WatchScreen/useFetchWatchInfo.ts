import { useQuery } from "react-query";
import { getWatchInfo } from "../../services/anime";

const useFetchWatchInfo = (slug: string) => {
  return useQuery(["watch-info", slug], () => getWatchInfo(slug));
};

export default useFetchWatchInfo;
