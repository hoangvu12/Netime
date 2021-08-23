import React, { PropsWithChildren, useState } from "react";
import { useEffect } from "react";
import { Settings } from "react-slick";
import AnimeCardSkeleton from "../../skeletons/AnimeCardSkeleton";
import { Anime } from "../../types";
import AnimeCard from "../AnimeCard";
import Carousel from "../Carousel";
import Skeleton from "../Skeleton";

import "./AnimeCarousel.css";

interface AnimeCarouselProps {
  settings?: Settings;
  isLoading?: boolean;
  data: Anime[] | undefined;
}

const defaultSettings = {
  slidesToShow: 5,
  slidesToScroll: 5,
  infinite: false,
  dots: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const AnimeCarousel = (props: PropsWithChildren<AnimeCarouselProps>) => {
  const { data = [], settings, isLoading } = props;
  const finalSettings = { ...defaultSettings, ...settings };
  const [slidesToShow, setSlidesToShow] = useState(
    finalSettings.slidesToScroll
  );
  useEffect(() => {
    const findSlidesToShow = () => {
      const { innerWidth } = window;

      const { responsive, slidesToScroll } = finalSettings;

      if (innerWidth > responsive[0].breakpoint) {
        setSlidesToShow(slidesToScroll);
      }

      for (let i = 1; i <= finalSettings.responsive.length; i++) {
        const currentResponsive = responsive[responsive.length - i];

        if (innerWidth <= currentResponsive.breakpoint) {
          const settings = currentResponsive.settings as Settings;

          setSlidesToShow(settings.slidesToShow!);

          break;
        }
      }
    };

    window.addEventListener("resize", findSlidesToShow);

    findSlidesToShow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Skeleton className="flex flex-wrap">
        {new Array(slidesToShow).fill(null).map((_, i) => (
          <AnimeCardSkeleton key={i} className={`w-1/${slidesToShow}`} />
        ))}
      </Skeleton>
    );
  }

  return !data.length ? (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-gray-300 text-base ">Không có</p>
    </div>
  ) : (
    <Carousel settings={finalSettings}>
      {data.map((anime) => (
        <AnimeCard {...anime} key={anime.slug} />
      ))}
    </Carousel>
  );
};

export default AnimeCarousel;
