import { To } from "history";
import React from "react";
import { Link } from "react-router-dom";
import AnimeCarousel from "../../components/AnimeCarousel";
import useFetchList from "../../hooks/useFetchList";

interface SectionProps {
  title: string;
  category: string;
  slug: string;
  to?: To;
}

const Section = (props: SectionProps) => {
  const { title, to, category, slug } = props;

  const { data, isLoading } = useFetchList(category, slug);

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

      <AnimeCarousel data={data?.data} isLoading={isLoading} />
    </div>
  );
};

export default Section;
