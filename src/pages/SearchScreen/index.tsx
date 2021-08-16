import React, { useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useNavigate } from "react-router";
import AnimeCard from "../../components/AnimeCard";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Skeleton from "../../components/Skeleton";
import useQueryParams from "../../hooks/useQueryParams";
import useSearch from "../../hooks/useSearch";
import AnimeCardSkeleton from "../../skeletons/AnimeCardSkeleton";

const SearchScreen = () => {
  const query = useQueryParams();
  const navigate = useNavigate();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const keyword = query.get("q");

  const {
    data,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useSearch({ keyword: keyword!, limit: 30 });

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    rootMargin: "0px 0px 100px 0px",
  });

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => refetch(), 1000);

    navigate(`/search?q=${e.target.value}`, { replace: true });
  };

  const list = data?.pages.map((list) => list.data).flat();

  return (
    <div className="px-8 py-20 lg:px-20 lg:py-24 w-full">
      <div className="w-full p-2">
        <div className="flex items-center justify-between">
          <p className="text-white font-medum text-4xl">
            Kết quả tìm kiếm: <strong>{keyword}</strong>
          </p>

          <Input
            type="text"
            placeholder="Tìm kiém"
            onChange={handleKeywordChange}
            className="bg-background-darker px-3 py-2"
            value={keyword || ""}
          />
        </div>

        {isLoading && (
          <Skeleton className="my-12 flex flex-wrap">
            {new Array(18).fill(null).map((_, i) => (
              <AnimeCardSkeleton
                key={i}
                className="mt-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7"
              />
            ))}
          </Skeleton>
        )}

        <div className="my-12 flex flex-wrap">
          {!isLoading &&
            list?.map((anime) => (
              <div
                className="mt-2 -mr-2 px-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7"
                key={anime.slug}
              >
                <AnimeCard {...anime} />
              </div>
            ))}
        </div>

        {(isFetchingNextPage || hasNextPage) && (
          <div ref={sentryRef}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
