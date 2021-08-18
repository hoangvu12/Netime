import { useQuery } from "react-query";
import { getSource } from "../../services/anime";
import { Source } from "../../types";

const useFetchSource = (
  animeId: number,
  episodeIndex: number,
  enabled?: boolean
) => {
  return useQuery<Source>(
    ["source", { animeId, episodeIndex }],
    () => getSource(animeId, episodeIndex),
    { enabled }
  );
};

export default useFetchSource;
