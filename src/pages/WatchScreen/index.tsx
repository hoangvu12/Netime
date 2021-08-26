import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button";
import Image from "../../components/Image";
import Loader from "../../components/Loader";
import useDevice from "../../hooks/useDevice";
import useOrientation from "../../hooks/useOrientiation";
import useQueryParams from "../../hooks/useQueryParams";
import { Episode } from "../../types";
import Storage from "../../utils/Storage";
import useFetchInfo from "../InfoScreen/useFetchInfo";
import EpisodesButton from "./EpisodesButton";
import useFetchSource from "./useFetchSource";
import Video, { addButtons, PlyrInstance } from "./Video";

const WatchScreen = () => {
  const { slug } = useParams();
  const query = useQueryParams();
  const navigate = useNavigate();
  const { isDesktop, isOrientationMobile } = useDevice();
  const { isPortrait } = useOrientation();

  const [showPauseScreen, setShowPauseScreen] = useState(false);
  const [showOrientationScreen, setShowOrientationScreen] = useState(false);
  const [episodeIndex, setEpisodeIndex] = useState(
    Number(query.get("episode_index")) || 0
  );
  const debounce = useRef<NodeJS.Timeout | null>(null);

  const { data: info, isLoading: isInfoLoading } = useFetchInfo(slug);

  const { data: source, isLoading: isSourceLoading } = useFetchSource(
    info?.id!,
    episodeIndex,
    !!info
  );

  const handleEpisodeClick = (_episode: Episode, i: number) => {
    navigate(`/watch/${slug}?episode_index=${i}`, { replace: true });
    setEpisodeIndex(i);
  };

  const handleNextEpisodeClick = () => {
    setEpisodeIndex((i) => i + 1);
  };

  const handleSourceChange = () => {
    const { episodes, thumbnail, ...rest } = info!;

    Storage.update(
      "recent",
      { id: info?.id },
      {
        ...rest,
        thumbnail: source?.thumbnail_medium,
        episodeIndex,
        time: episodes[episodeIndex].full_name,
      }
    );

    addButtons([
      {
        component: (
          <EpisodesButton
            episodes={info?.episodes!}
            onClick={handleEpisodeClick}
            activeIndex={episodeIndex}
          />
        ),
        id: "episodes-button",
        position: 6,
        className: "flex items-center justify-center",
      },
    ]);
  };

  const handleReady = (player: PlyrInstance) => {
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
    }
  };

  useEffect(() => {
    if (isPortrait) {
      setShowOrientationScreen(true);
    } else {
      setShowOrientationScreen(false);
    }
  }, [isPortrait]);

  if (isInfoLoading || isSourceLoading) {
    return (
      <div className="absolute flex items-center justify-center bg-background inset-0 w-screen h-screen z-50">
        <Loader />
      </div>
    );
  }

  return (
    <div className="fixed scrollbar-hide bg-background inset-0 w-screen h-screen z-50">
      <div className="relative w-full h-full">
        <Video
          source={{
            type: "video",
            sources: [
              {
                src: source?.videoSource!,
              },
            ],
          }}
          onReady={handleReady}
          onSourceChange={handleSourceChange}
          nextEpisodeClick={handleNextEpisodeClick}
        >
          <div className="absolute top-8 left-8">
            <HiArrowNarrowLeft
              size={30}
              className="text-gray-300 hover:text-white cursor-pointer"
              onClick={() => navigate(-1)}
            />
          </div>
        </Video>

        <div
          className={classNames(
            "absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center",
            !showOrientationScreen ? "hidden" : "block"
          )}
        >
          <Image
            src="/rotate_landscape.gif"
            alt="Please rotate your device to landscape"
          />

          <h1 className="text-center text-white text-xs sm:text-sm font-medium">
            Chuyển sang chế độ ngang để có trải nghiệm tốt nhất.
          </h1>

          <Button
            className="text-white my-4 bg-primary"
            onClick={() => setShowOrientationScreen(false)}
          >
            Đóng
          </Button>
        </div>

        <div
          className={classNames(
            "absolute inset-0 bg-black bg-opacity-90 px-40 flex flex-col space-y-6 justify-center",
            !showPauseScreen || isOrientationMobile ? "hidden" : "block"
          )}
          onMouseEnter={() => {
            if (isDesktop && showPauseScreen) {
              setShowPauseScreen(false);
            }
          }}
        >
          <div className="space-y-2">
            <h1 className="text-gray-400 font-medium text-lg">Bạn đang xem</h1>
            <h1 className="text-white font-bold text-5xl">{info?.name}</h1>
            <h1 className="text-white font-bold text-2xl">
              {source?.full_name}
            </h1>
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
