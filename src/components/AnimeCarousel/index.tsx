import React, { PropsWithChildren } from "react";
import { Settings } from "react-slick";
import { Anime } from "../../types";
import AnimeCard from "../AnimeCard";
import Carousel from "../Carousel";

import "./AnimeCarousel.css";

interface AnimeCarouselProps {
  settings?: Settings;
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
  const { data = [], settings } = props;
  const finalSettings = { ...defaultSettings, ...settings };

  return (
    <Carousel settings={finalSettings}>
      {data.map((anime) => (
        <AnimeCard {...anime} key={anime.slug} />
      ))}
    </Carousel>
  );
};

export default AnimeCarousel;
