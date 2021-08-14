import { useInfiniteQuery } from "react-query";
import { search } from "../services/anime";

const useSearch = ({
  keyword,
  limit = 30,
  enabled = true,
}: {
  keyword: string;
  limit: number;
  enabled?: boolean;
  sort?: string;
}) => {
  const fetchList = ({ pageParam = 1 }) =>
    search({ keyword, page: pageParam, limit });

  return useInfiniteQuery(["search", { limit }], fetchList, {
    enabled,
    getNextPageParam: ({ pagination }) =>
      pagination.currentPage >= pagination.totalPage
        ? null
        : pagination.currentPage + 1,
  });
};

export default useSearch;
