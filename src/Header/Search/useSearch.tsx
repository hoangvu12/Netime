import { useInfiniteQuery } from "react-query";
import { search } from "../../services/anime";

const useSearch = ({
  keyword,
  limit = 30,
}: {
  keyword: string;
  limit: number;
}) =>
  useInfiniteQuery(["search", keyword], () => search(keyword, limit), {
    enabled: false,
  });

export default useSearch;
