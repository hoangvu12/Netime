import React from "react";
import Carousel from "../../components/Carousel";
import Loader from "../../components/Loader";
import useFetchList from "../../hooks/useFetchList";
import Section from "./Section";
import Slide from "./Slide";
import useFetchSlide from "./useFetchSlide";

const HomePage = () => {
  const { data: slides, isLoading: isSlideLoading } = useFetchSlide();

  const { data: latestList, isLoading: isLatestLoading } = useFetchList(
    "types",
    "anime-moi"
  );

  const { data: upcomingList, isLoading: isUpcomingLoading } = useFetchList(
    "types",
    "anime-sap-chieu"
  );

  return (
    <div className="w-full space-y-6">
      <div className="hidden md:block">
        {isSlideLoading ? (
          <Loader />
        ) : (
          <Carousel>
            {slides?.map((slide) => (
              <Slide {...slide} key={slide.slug} />
            ))}
          </Carousel>
        )}
      </div>

      <div className="space-y-6">
        <Section
          data={latestList?.data}
          title="Mới cập nhật"
          isLoading={isLatestLoading}
          to="/types/anime-moi"
        />

        <Section
          data={upcomingList?.data}
          title="Sắp chiếu"
          isLoading={isUpcomingLoading}
          to="/types/anime-sap-chieu"
        />
      </div>
    </div>
  );
};

export default HomePage;
