import { useQuery } from "react-query";
import { getList } from "../services/anime";

const useFetchList = (
  category: string,
  slug: string,
  enabled: boolean = true
) => {
  return useQuery([{ category, slug }], () => getList({ category, slug }), {
    enabled,
  });
};

export default useFetchList;
