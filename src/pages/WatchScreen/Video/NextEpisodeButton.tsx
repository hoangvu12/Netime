import classNames from "classnames";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { PlyrInstance } from ".";

interface Props {
  player: PlyrInstance;
  onClick?: () => void;
}

const NextEpisodeButton: React.FC<Props> = ({ player, onClick }) => {
  const [showNextEpisodeButton, setShowNextEpisodeButton] = useState(false);

  useEffect(() => {
    player.on("timeupdate", () => {
      const remainingTime = Math.round(player.duration - player.currentTime);
      const triggerTime = 120; // Seconds

      if (remainingTime <= triggerTime) {
        setShowNextEpisodeButton(true);
      } else {
        setShowNextEpisodeButton(false);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames(
        "z-1 absolute right-10 bottom-20 transition duration-300",
        !showNextEpisodeButton ? "opacity-0 invisible" : "opacity-100 visible"
      )}
    >
      <button
        className={classNames(
          "rounded-md flex items-center bg-white hover:bg-gray-300 px-4 py-2 space-x-2"
        )}
        onClick={onClick}
      >
        <BsFillPlayFill size={30} />
        <p>Tập tiếp theo</p>
      </button>
    </div>
  );
};

export default NextEpisodeButton;
