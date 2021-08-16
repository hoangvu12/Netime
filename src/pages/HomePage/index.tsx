import React from "react";
import Carousel from "../../components/Carousel";
import Skeleton from "../../components/Skeleton";
import Section from "./Section";
import Slide from "./Slide";
import useFetchSlide from "./useFetchSlide";

const sections = [
  {
    title: "Mới cập nhật",
    category: "types",
    slug: "anime-moi",
    to: "/types/anime-moi",
  },
  {
    category: "types",
    slug: "anime-sap-chieu",
    title: "Sắp chiếu",
    to: "/types/anime-sap-chieu",
  },
  {
    category: "ranking",
    slug: "viewed-today",
    title: "Xem nhiều trong ngày",
  },
  {
    category: "ranking",
    slug: "top-voted",
    title: "Được yêu thích",
  },
];

const HomePage = () => {
  const { data: slides, isLoading: isSlideLoading } = useFetchSlide();

  return (
    <div className="px-8 py-20 lg:px-20 lg:py-24 w-full h-full space-y-6">
      <div className="hidden md:block">
        {isSlideLoading ? (
          <Skeleton className="w-full h-full">
            <div className="bg-gray-600 h-96 w-full"></div>
          </Skeleton>
        ) : (
          <Carousel>
            {slides?.map((slide) => (
              <Slide {...slide} key={slide.slug} />
            ))}
          </Carousel>
        )}
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <Section {...section} key={section.slug} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
