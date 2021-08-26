import classNames from "classnames";
import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button";
import EpisodeChunk from "../../components/EpisodeChunk";
import Image from "../../components/Image";
import Skeleton from "../../components/Skeleton";
import { Anime, Episode as EpisodeType } from "../../types";
import { chunk, numberWithCommas } from "../../utils";
import Storage from "../../utils/Storage";
import useFetchInfo from "./useFetchInfo";

const InfoScreen = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) {
    navigate("/");
  }

  const storedInfo = Storage.findOne<Anime>("recent", { slug });

  const handleEpisodeClick = (_e: EpisodeType, index: number) => {
    navigate(`/watch/${slug}?episode_index=${index}`);
  };

  const { data: info, isLoading } = useFetchInfo(slug);

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
            <div className="flex-col md:flex-row space-x-2 space-y-2 md:space-y-0 -mt-2 self-center md:self-start flex items-center font-bold text-lg text-white filter blur-none">
              <Button
                className="bg-background-darker hover:bg-opacity-80"
                onClick={handleClick()}
                startIcon={BsPlayFill}
                iconSize={20}
              >
                Xem ngay
              </Button>
              {!isLoading && storedInfo && (
                <Button
                  className="bg-background-darker hover:bg-opacity-80"
                  onClick={handleClick(storedInfo.episodeIndex)}
                  startIcon={BsPlayFill}
                  iconSize={20}
                >
                  Xem {info?.episodes[storedInfo.episodeIndex!].full_name}
                </Button>
              )}
            </div>

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
          <div className="space-y-2 w-full px-4 md:px-32 py-16">
            {chunk<EpisodeType>(info?.episodes!, 18).map((chunk, i) => {
              const firstEpisode = chunk[0];
              const lastEpisode = chunk[chunk.length - 1];

              return (
                <EpisodeChunk
                  buttonClassName="bg-background-darker"
                  title={`Tập ${firstEpisode.name} - Tập ${lastEpisode.name}`}
                  episodes={chunk}
                  key={i}
                  episodeOnClick={handleEpisodeClick}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoScreen;
