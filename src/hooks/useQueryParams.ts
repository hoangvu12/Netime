import { useLocation } from "react-router";

const useQueryParams = () => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  return params;
};

export default useQueryParams;
