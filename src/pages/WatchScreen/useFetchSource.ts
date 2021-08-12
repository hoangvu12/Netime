import { useQuery } from "react-query";
import { getSource } from "../../services/anime";
import { Source } from "../../types";

const useFetchSource = (
  hash: string | undefined,
  id: number | undefined,
  enabled?: boolean
) => {
  return useQuery<Source>(
    ["source", { hash, id }],
    () => getSource(hash!, id!),
    { enabled }
  );
};

export default useFetchSource;
