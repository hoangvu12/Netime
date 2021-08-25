/* eslint-disable no-useless-escape */
import { useEffect, useState } from "react";

const useDevice = () => {
  const [width, setWidth] = useState<number>(window.screen.width);

  function handleWindowSizeChange() {
    setWidth(window.screen.width);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isDesktop = width > 768;
  // If device has orientation, then it is mobile
  const isOrientationMobile = typeof window.orientation !== "undefined";

  return { isMobile, isDesktop, isOrientationMobile };
};

export default useDevice;
