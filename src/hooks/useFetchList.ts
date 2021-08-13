import { useQuery } from "react-query";
import { getList } from "../services/anime";

const useFetchList = (category: string, slug: string) => {
  return useQuery([{ category, slug }], () => getList({ category, slug }));
};

export default useFetchList;
