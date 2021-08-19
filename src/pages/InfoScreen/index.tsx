import classNames from "classnames";
import React, { useState } from "react";
import { BsPlayFill } from "react-icons/bs";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button";
import Episode from "../../components/Episode";
import Image from "../../components/Image";
import Loader from "../../components/Loader";
import Skeleton from "../../components/Skeleton";
import { numberWithCommas } from "../../utils";
import useFetchInfo from "./useFetchInfo";

const InfoScreen = () => {
  const [isLoadingNewEpisodes, setIsLoadingNewEpisodes] = useState(false);
  const [visibleEpisodes, setVisibleEpisodes] = useState(24);

  const { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) {
    navigate("/");
  }

  const handleShowEpisodes = () => {
    setIsLoadingNewEpisodes(true);
    setVisibleEpisodes((prev) => prev + 24);
    setIsLoadingNewEpisodes(false);
  };

  const { data: info, isLoading } = useFetchInfo(slug);

  const hasNextPage = visibleEpisodes < info?.episodes?.length!;

  const [sentryRef] = useInfiniteScroll({
    loading: isLoadingNewEpisodes,
    hasNextPage,
    onLoadMore: handleShowEpisodes,
  });

  const handleClick = (index = 0) => {
    return () => navigate(`/watch/${slug}?episode_index=${index}`);
  };

  return (
    <div className="py-16">
      <div className="w-full">
        <div className="w-full h-56 overflow-hidden">
          {isLoading ? (
            <Skeleton className="w-full h-full">
              <div className="w-full h-full bg-gray-600"></div>
            </Skeleton>
          ) : (
            <Image
              src={info?.thumbnail!}
              className="w-full object-cover filter blur-lg opacity-30"
            />
          )}
        </div>
        <div className="space-y-4 md:space-x-4 w-full px-2 md:px-12 lg:px-24 -mt-28 md:-mt-14 flex items-center justify-center flex-col md:items-start md:justify-start md:flex-row">
          <div className="w-full md:w-44 lg:w-52 space-y-4 md:space-y-0">
            {isLoading ? (
              <Skeleton>
                <div className="border-4 border-background bg-gray-600 mx-auto w-44 lg:w-52 h-60 lg:h-80 rounded-md md:rounded-b-none"></div>
              </Skeleton>
            ) : (
              <Image
                src={info?.thumbnail!}
                alt={info?.name}
                className={classNames(
                  "mx-auto filter blur-none w-44 lg:w-52 h-60 lg:h-80 object-cover rounded-md md:rounded-b-none"
                )}
              />
            )}

            {!isLoading && (
              <div
                className={classNames(
                  "text-white md:bg-background-darker p-3 w-full space-y-2 rounded-b-md min-h-11"
                )}
              >
                <h1 className="text-base line-clamp-2">{info?.name}</h1>

                <div>
                  <h1 className="text-sm line-clamp-1">
                    Nhóm sub: {info?.subTeams.join(", ")}
                  </h1>
                  <h1 className="text-sm line-clamp-1">
                    Lượt xem: {numberWithCommas(info?.views)}
                  </h1>
                </div>
              </div>
            )}
          </div>

          <div className="w-full px-2 flex flex-col flex-1">
            <Button
              className="-mt-2 self-center md:self-start bg-background-darker filter blur-none text-primary font-bold text-lg"
              onClick={handleClick()}
              startIcon={BsPlayFill}
              iconSize={20}
            >
              Xem ngay
            </Button>

            <div className="mt-6 space-y-2">
              <div className="space-y-1">
                {isLoading ? (
                  <Skeleton>
                    <div className="h-8 bg-gray-600"></div>
                  </Skeleton>
                ) : (
                  <h1 className="text-white text-2xl">{info?.name}</h1>
                )}

                {isLoading ? (
                  <Skeleton>
                    <div className="h-6 bg-gray-600"></div>
                  </Skeleton>
                ) : (
                  <h1 className="text-gray-400 text-base">
                    Thể loại: {info?.genres.map(({ name }) => name).join(", ")}
                  </h1>
                )}
              </div>

              {isLoading ? (
                <Skeleton>
                  <div className="h-6 bg-gray-600"></div>
                </Skeleton>
              ) : (
                <h1 className="text-gray-300 text-base">{info?.description}</h1>
              )}
            </div>
          </div>
        </div>
        {!isLoading && (
          <div className="space-y-4 w-full px-4 md:px-32 py-16 flex flex-col items-cener justify-center">
            <h1 className="text-white text-2xl font-medium">Tập phim</h1>
            <div className="space-y-4">
              {info?.episodes
                .slice(0, visibleEpisodes)
                .map((episode, index) => (
                  <Episode
                    {...episode}
                    key={episode.slug}
                    onClick={handleClick(index)}
                  />
                ))}
            </div>
            {(isLoadingNewEpisodes || hasNextPage) && (
              <div ref={sentryRef}>
                <Loader />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoScreen;
