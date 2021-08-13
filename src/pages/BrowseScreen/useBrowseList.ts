import { useInfiniteQuery } from "react-query";
import { getList } from "../../services/anime";

interface Props {
  category: string;
  slug: string;
  sort: string;
}

const useBrowseList = (props: Props) => {
  const fetchList = ({ pageParam = 1 }) =>
    getList({ ...props, page: pageParam });

  return useInfiniteQuery(["browse", props], fetchList, {
    getNextPageParam: ({ pagination }) =>
      pagination.currentPage >= pagination.totalPage
        ? null
        : pagination.currentPage + 1,
  });
};

export default useBrowseList;
