import classNames from "classnames";
import { SourceInfo } from "plyr";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import useDevice from "../../hooks/useDevice";
import useOrientation from "../../hooks/useOrientiation";
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
  const { isDesktop } = useDevice();
  const { isPortrait } = useOrientation();

  const [showNextEpButton, setShowNextEpButton] = useState(false);
  const [showPauseScreen, setShowPauseScreen] = useState(false);
  const [showOrientationScreen, setShowOrientationScreen] = useState(false);
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

  useEffect(() => {
    if (isPortrait) {
      setShowOrientationScreen(true);
    } else {
      setShowOrientationScreen(false);
    }
  }, [isPortrait]);

  const handleReady = (player: PlyrInstance, _event: PlyrEvent) => {
    addButtons([
      {
        component: (
          <EpisodesButton
            episodes={info?.episodes.map((episode) => episode.name)!}
            onClick={handleEpisodeClick}
            activeIndex={episodeIndex}
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

    if (isDesktop) {
      document.addEventListener("visibilitychange", () => {
        if (debounce.current) {
          clearTimeout(debounce.current);
        }

        if (document.visibilityState === "visible") {
          return;
        }

        const timeoutSeconds = 6;

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
    }
  };

  if (isInfoLoading || isSourceLoading) {
    return (
      <div className="absolute flex items-center justify-center bg-background inset-0 w-screen h-screen z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="absolute bg-background inset-0 w-screen h-screen z-50">
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
            "absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center",
            !showOrientationScreen ? "hidden" : "block"
          )}
        >
          <img
            src="/rotate_landscape.gif"
            alt="Please rotate your device to landscape"
          />

          <h1 className="text-center text-white text-xs sm:text-sm font-medium">
            Chuyển sang chế độ ngang để có trải nghiệm tốt nhất.
          </h1>
        </div>

        <div
          className={classNames(
            "absolute inset-0 bg-black bg-opacity-90 px-40 flex flex-col space-y-6 justify-center",
            !showPauseScreen ? "hidden" : "block"
          )}
          onMouseEnter={() => {
            if (isDesktop && showPauseScreen) {
              setShowPauseScreen(false);
            }
          }}
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
