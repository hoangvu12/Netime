import classNames from "classnames";
import { SourceInfo } from "plyr";
import React, { useMemo, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import useQueryParams from "../../hooks/useQueryParams";
import EpisodesButton from "./EpisodesButton";
import useFetchSource from "./useFetchSource";
import useFetchWatchInfo from "./useFetchWatchInfo";
import Video, { addButtons, PlyrEvent, PlyrInstance } from "./Video";
import "./Video.css";

const WatchScreen = () => {
  const { slug } = useParams();
  const query = useQueryParams();

  const navigate = useNavigate();
  const [showNextEpButton, setShowNextEpButton] = useState(false);
  const [showPauseScreen, setShowPauseScreen] = useState(false);
  const [episodeIndex, setEpisodeIndex] = useState(
    Number(query.get("episode_index")) || 0
  );
  const debounce = useRef<NodeJS.Timeout | null>(null);

  const { data: info, isLoading: isInfoLoading } = useFetchWatchInfo(slug);

  const currentEpisode = info?.episodes[episodeIndex];

  const { data: source, isLoading: isSourceLoading } = useFetchSource(
    currentEpisode?.hash,
    currentEpisode?.id,
    !!info
  );

  const videoSource = useMemo<SourceInfo>(
    () => ({
      type: "video",
      sources: [
        {
          src: source?.source!,
        },
      ],
    }),
    [source]
  );

  const handleEpisodeClick = (_episode: string, i: number) => {
    setEpisodeIndex(i);
  };

  const handleReady = (player: PlyrInstance, _event: PlyrEvent) => {
    addButtons([
      {
        component: (
          <EpisodesButton
            episodes={info?.episodes.map((episode) => episode.name)!}
            onClick={handleEpisodeClick}
          />
        ),
        position: 6,
        className: "flex items-center justify-center",
      },
    ]);

    player.on("timeupdate", () => {
      const remainingTime = Math.round(player.duration - player.currentTime);
      const triggerTime = 120; // Seconds

      if (remainingTime <= triggerTime) {
        if (!showNextEpButton) {
          setShowNextEpButton(true);
        }
      }
    });

    player.on("pause", () => {
      const timeoutSeconds = 2;

      if (debounce.current) {
        clearTimeout(debounce.current);
      }

      debounce.current = setTimeout(
        () => setShowPauseScreen(true),
        timeoutSeconds * 1000
      );
    });

    player.on("play", () => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
    });
  };

  if (isInfoLoading || isSourceLoading) {
    return (
      <div className="absolute flex items-center justify-center bg-background inset-0 w-screen h-screen z-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="absolute bg-background inset-0 w-screen h-screen z-20">
      <div className="relative w-full h-full">
        <Video source={videoSource} onReady={handleReady} />

        <div className="absolute top-8 left-8">
          <HiArrowNarrowLeft
            size={30}
            className="text-gray-300 hover:text-white cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>

        <div
          className={classNames(
            "absolute bottom-20 right-10",
            !showNextEpButton ? "hidden" : "block"
          )}
        >
          <Button startIcon={FaPlay} className="shadow-lg bg-white text-black">
            Tập tiếp theo
          </Button>
        </div>

        <div
          className={classNames(
            "absolute inset-0 bg-black bg-opacity-90 px-40 flex flex-col space-y-6 justify-center",
            !showPauseScreen ? "hidden" : "block"
          )}
          onMouseEnter={() => setShowPauseScreen(false)}
        >
          <div className="space-y-2">
            <h1 className="text-gray-400 font-medium text-lg">Bạn đang xem</h1>
            <h1 className="text-white font-bold text-5xl">{info?.title}</h1>
            <h1 className="text-white font-bold text-2xl">Tập 1</h1>
          </div>

          <h1 className="text-gray-500 text-base font-medium line-clamp-3">
            {info?.description}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default WatchScreen;
