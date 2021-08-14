import React, { useState } from "react";
import { Img, ImgProps } from "react-image";
import Loader from "./Loader";

const Image = (props: ImgProps) => {
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = ({
    currentTarget,
  }) => {
    const { offsetWidth, offsetHeight } = currentTarget;

    setDimensions({
      height: offsetHeight,
      width: offsetWidth,
    });
  };

  return (
    <Img
      onLoad={handleImageLoad}
      onError={handleImageLoad}
      loader={
        <div style={dimensions} className="flex justify-center items-center">
          <Loader />
        </div>
      }
      {...props}
    />
  );
};

export default Image;
