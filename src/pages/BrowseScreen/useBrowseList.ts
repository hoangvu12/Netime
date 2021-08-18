import { useInfiniteQuery } from "react-query";
import { getList } from "../../services/anime";

interface Props {
  category: string;
  slug: string;
}

const useBrowseList = (props: Props) => {
  const fetchList = ({ pageParam = 1 }) =>
    getList({ ...props, page: pageParam });

  return useInfiniteQuery(["browse", props], fetchList, {
    getNextPageParam: (response) => {
      if (!response.pagination) {
        return;
      }

      const { pagination } = response;

      return pagination.currentPage >= pagination.totalPage
        ? null
        : pagination.currentPage + 1;
    },
  });
};

export default useBrowseList;
