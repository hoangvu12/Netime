import { useInfiniteQuery } from "react-query";
import { search } from "../services/anime";

const useSearch = ({
  keyword,
  limit = 24,
  enabled = true,
}: {
  keyword: string;
  limit: number;
  enabled?: boolean;
  sort?: string;
}) => {
  const fetchList = ({ pageParam = 1 }) =>
    search({ q: keyword, page: pageParam, limit });

  return useInfiniteQuery(["search", { limit, keyword }], fetchList, {
    enabled: !keyword ? false : enabled,
    getNextPageParam: ({ pagination }) =>
      pagination.currentPage >= pagination.totalPage
        ? null
        : pagination.currentPage + 1,
  });
};

export default useSearch;
