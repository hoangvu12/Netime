import classNames from "classnames";
import React, { useState } from "react";
import { PlyrInstance } from ".";
import useDevice from "../../../hooks/useDevice";
import PlyrControls from "./Controls";

interface OverlayProps {
  player: PlyrInstance;
}

const Overlay: React.FC<OverlayProps> = ({ player, children }) => {
  const [show, setShow] = useState<boolean>(true);
  const { isOrientationMobile } = useDevice();

  player.on("controlsshown", () => {
    setShow(true);
  });

  player.on("controlshidden", () => {
    setShow(false);
  });

  return (
    <div
      className={classNames(
        "plyr--overlay transition duration-300 z-1",
        show ? "opacity-100" : "opacity-0"
      )}
    >
      {/* Background Overlay */}
      <div
        className={classNames(
          "absolute left-0 top-0 h-full w-full bg-black bg-opacity-70 transition duration-300",
          !isOrientationMobile && "hidden"
        )}
      />

      <PlyrControls player={player} />

      {children}
    </div>
  );
};

export default Overlay;
