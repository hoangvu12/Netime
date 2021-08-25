import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { BsFillPlayFill, BsPause } from "react-icons/bs";
import { PlyrInstance } from ".";
import useDevice from "../../../hooks/useDevice";

interface ButtonProps {
  onClick?: () => void;
}

const RewindButton = (props: ButtonProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="text-gray-300 hover:text-white w-8 h-8 cursor-pointer"
    onClick={props.onClick}
  >
    <use xlinkHref="/plyr.svg#plyr-rewind"></use>
  </svg>
);

const ForwardButton = (props: ButtonProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="text-gray-300 hover:text-white w-8 h-8 cursor-pointer"
    onClick={props.onClick}
  >
    <use xlinkHref="/plyr.svg#plyr-fast-forward"></use>
  </svg>
);

const PlayButton = (props: ButtonProps & { playing: boolean }) => {
  return !props.playing ? (
    <BsFillPlayFill
      className="text-gray-300 hover:text-white w-16 h-16 cursor-pointer"
      onClick={props.onClick}
    />
  ) : (
    <BsPause
      className="cursor-pointer text-gray-300 hover:text-white w-16 h-16"
      onClick={props.onClick}
    />
  );
};

export interface PlyrControlsProps {
  player: PlyrInstance;
}

const PlyrControls: React.FC<PlyrControlsProps> = ({ player }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { isOrientationMobile } = useDevice();

  player.on("play", () => {
    setIsPlaying(true);
  });

  player.on("pause", () => {
    setIsPlaying(false);
  });

  useEffect(() => {
    const defaultPlayButton = document.querySelector<HTMLElement>(
      ".plyr__control--overlaid"
    );

    if (defaultPlayButton) {
      if (isOrientationMobile) {
        defaultPlayButton.style.display = "none";
      }
    }
  }, [isOrientationMobile]);
  // @ts-ignore
  const { seekTime } = player.config;

  const handleRewind = useCallback(() => {
    player.rewind(seekTime);
  }, [player, seekTime]);

  const handleForward = useCallback(() => {
    player.forward(seekTime);
  }, [player, seekTime]);

  const handlePlay = useCallback(() => {
    const { playing } = player;

    if (playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  return (
    <div
      className={classNames(
        "text-white flex items-center justify-evenly absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12",
        !isOrientationMobile && "hidden"
      )}
    >
      <RewindButton onClick={handleRewind} />
      <PlayButton playing={isPlaying} onClick={handlePlay} />
      <ForwardButton onClick={handleForward} />
    </div>
  );
};

export default PlyrControls;
