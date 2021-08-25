import React from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useLocation } from "react-router";
import AnimeCard from "../../components/AnimeCard";
import Loader from "../../components/Loader";
import Skeleton from "../../components/Skeleton";
import { GENRES, RANKINGS } from "../../constants";
import AnimeCardSkeleton from "../../skeletons/AnimeCardSkeleton";
import useBrowseList from "./useBrowseList";

const ALL = [...RANKINGS, ...GENRES];

const BrowseScreen = () => {
  const { pathname } = useLocation();

  const [category, ...slug] = pathname.replace("/", "").split("/");

  const { data, hasNextPage, isLoading, fetchNextPage, isFetchingNextPage } =
    useBrowseList({ category, slug: slug.join("/") });

  const [sentryRef] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    rootMargin: "0px 0px 100px 0px",
  });

  const current = ALL.find((type) => pathname.includes(type.slug));

  const list = data?.pages.map((list) => list.data).flat();

  return (
    <div className="w-full px-2 py-20 lg:px-20 lg:py-24">
      <div className="w-full p-2">
        <div className="flex items-center justify-between">
          <p className="text-white font-bold text-4xl">{current?.name}</p>
        </div>

        {isLoading && (
          <Skeleton className="my-12 flex flex-wrap">
            {new Array(18).fill(null).map((_, i) => (
              <AnimeCardSkeleton
                key={i}
                className="mt-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
              />
            ))}
          </Skeleton>
        )}

        <div className="my-12 flex flex-wrap">
          {!isLoading &&
            list?.map((anime) => (
              <div
                className="mt-2 -mr-2 px-2 w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6"
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

export default BrowseScreen;
