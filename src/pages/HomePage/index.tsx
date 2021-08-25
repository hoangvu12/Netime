import React from "react";
import { Anime } from "../../types";
import Storage from "../../utils/Storage";
import Section from "./Section";
import SlideCarousel from "./SlideCarousel";

const sections = [
  {
    title: "Xem gần đây",
    data: Storage.find<Anime>("recent").reverse(),
  },
  {
    title: "Mới cập nhật",
    category: "recently",
  },
  {
    category: "recommended",
    title: "Hôm nay xem gì?",
  },
  {
    category: "ranking",
    slug: "ngay",
    title: "Xem nhiều trong ngày",
  },
];

const HomePage = () => {
  return (
    <div className="px-8 py-20 lg:px-20 lg:py-24 w-full h-full space-y-6">
      <div className="hidden md:block">
        <SlideCarousel />
      </div>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <Section {...section} key={i} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
