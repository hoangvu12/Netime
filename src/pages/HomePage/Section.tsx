import React from "react";
import AnimeCarousel from "../../components/AnimeCarousel";
import Loader from "../../components/Loader";
import { Anime } from "../../types";

interface SectionProps {
  title: string;
  data: Anime[] | undefined;
  isLoading?: boolean;
}

const Section = (props: SectionProps) => {
  const { title, data = [], isLoading = false } = props;

  return (
    <div className="mt-6">
      <h1 className="text-2xl text-white font-medium ml-2 mb-3">{title}</h1>

      {isLoading ? <Loader /> : <AnimeCarousel data={data} />}
    </div>
  );
};

export default Section;
