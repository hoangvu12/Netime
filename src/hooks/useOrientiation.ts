import { useEffect, useState } from "react";

const ORIENTATION = {
  landscape: "LANDSCAPE",
  portrait: "portrait",
};

const useOrientation = () => {
  const [orientation, setOrientation] = useState(ORIENTATION.portrait);

  useEffect(() => {
    const findOrientation = () => {
      if (window.matchMedia("(orientation: portrait)").matches) {
        setOrientation(ORIENTATION.portrait);
      }

      if (window.matchMedia("(orientation: landscape)").matches) {
        setOrientation(ORIENTATION.landscape);
      }
    };

    window.addEventListener("resize", findOrientation);

    findOrientation();

    return () => {
      window.removeEventListener("resize", findOrientation);
    };
  }, []);

  return {
    isLandscape: orientation === ORIENTATION.landscape,
    isPortrait: orientation === ORIENTATION.portrait,
  };
};

export default useOrientation;
