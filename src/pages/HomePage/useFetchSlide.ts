import { useQuery } from "react-query";
import { getSlide } from "../../services/anime";

const useFetchSlide = () => {
  return useQuery("slides", getSlide);
};

export default useFetchSlide;
