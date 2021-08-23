import { To } from "history";
import React from "react";
import { Link } from "react-router-dom";
import AnimeCarousel from "../../components/AnimeCarousel";
import useFetchList from "../../hooks/useFetchList";
import { Anime } from "../../types";

interface SectionProps {
  title: string;
  category?: string;
  slug?: string;
  to?: To;
  data?: Anime[];
}

const Section = (props: SectionProps) => {
  const { title, to, category = "", slug = "", data: animeData } = props;

  const { data, isLoading } = useFetchList(
    category,
    slug,
    !Array.isArray(animeData)
  );

  return (
    <div className="mt-6">
      <div className="flex items-baseline justify-between space-x-2 text-white mb-3">
        <h1 className="text-2xl font-medium">{title}</h1>
        {to && (
          <Link to={to}>
            <h1 className="text-base text-gray-400 hover:text-secondary transition duration-300">
              Xem tất cả
            </h1>
          </Link>
        )}
      </div>

      <AnimeCarousel
        data={animeData ? animeData : data?.data}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Section;
