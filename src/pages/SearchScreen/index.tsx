import React, { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useNavigate } from "react-router";
import AnimeCard from "../../components/AnimeCard";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Skeleton from "../../components/Skeleton";
import useDebounce from "../../hooks/useDebounce";
import useQueryParams from "../../hooks/useQueryParams";
import useSearch from "../../hooks/useSearch";
import AnimeCardSkeleton from "../../skeletons/AnimeCardSkeleton";

const SearchScreen = () => {
  const query = useQueryParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(query.get("q"));
  const debouncedKeyword = useDebounce(keyword || "", 1000);

  const { data, hasNextPage, isLoading, fetchNextPage, isFetchingNextPage } =
    useSearch({ keyword: debouncedKeyword, limit: 30, enabled: true });

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    rootMargin: "0px 0px 100px 0px",
  });

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    navigate(`/search?q=${e.target.value}`, { replace: true });
  };

  const list = data?.pages.map((list) => list.data).flat();

  return (
    <div className="px-2 py-20 lg:px-20 lg:py-24 w-full">
      <div className="w-full p-2">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 items-center justify-between">
          <p className="text-white font-medum text-4xl">
            Kết quả tìm kiếm: <strong>{keyword}</strong>
          </p>

          <Input
            type="text"
            placeholder="Tìm kiếm"
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

        {!list?.length && (
          <div className="my-12 flex items-center justify-center">
            <p className="text-gray-300 text-lg text-center">
              {!debouncedKeyword ? "Nhập từ khóa" : "Không có"}
            </p>
          </div>
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
