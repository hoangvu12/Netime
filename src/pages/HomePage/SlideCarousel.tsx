import React from "react";
import Carousel from "../../components/Carousel";
import Skeleton from "../../components/Skeleton";
import Slide from "./Slide";
import useFetchSlide from "./useFetchSlide";

const SlideCarousel = () => {
  const { data: slides, isLoading: isSlideLoading } = useFetchSlide();

  return isSlideLoading ? (
    <Skeleton className="w-full h-80">
      <div className="bg-gray-600 h-full w-full"></div>
    </Skeleton>
  ) : (
    <Carousel>
      {slides?.map((slide) => (
        <Slide {...slide} key={slide.slug} />
      ))}
    </Carousel>
  );
};

export default SlideCarousel;
