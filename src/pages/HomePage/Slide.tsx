import React from "react";
import {
  AiFillStar,
  AiFillVideoCamera,
  AiOutlineCalendar,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import TextIcon from "../../components/TextIcon";
import { Anime } from "../../types";

const Slide = (props: Anime) => {
  return (
    <Link to={`/info/${props.slug}`}>
      <div className="relative slide-anime-image">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-80">
          <div className="absolute bottom-0 w-2/3 space-y-2 p-6">
            <h1 className="text-white text-3xl line-clamp-2 font-medium">
              {props.title}
            </h1>

            <div className="flex items-center">
              <TextIcon
                icon={AiFillStar}
                iconClassName="text-yellow-400 mr-1"
                text={props.stars.toString()}
                textClassName="text-yellow-400 text-sm"
              />

              <TextIcon
                className="mx-2"
                icon={BiTime}
                iconClassName="text-gray-400 mr-1"
                text={props.time!}
                textClassName="text-white text-sm"
              />

              <TextIcon
                className="mx-2"
                icon={AiOutlineCalendar}
                iconClassName="text-gray-400 mr-1"
                text={props.date!}
                textClassName="text-white text-sm"
              />

              <p className="px-2 py-1 text-xs font-medium bg-primary text-white rounded-md">
                {props.quality}
              </p>
            </div>

            <p className="text-gray-400 line-clamp-4">{props.description}</p>

            <div>
              <TextIcon
                icon={AiFillVideoCamera}
                iconClassName="text-primary mr-1"
                text={`Studio: ${props.studio}`}
                textClassName="text-white text-sm"
              />
              <TextIcon
                icon={AiOutlineUnorderedList}
                iconClassName="text-primary mr-1"
                text={`Thể loại: ${props.genres
                  ?.map(({ name }) => name)
                  .join(", ")}`}
                textClassName="text-white text-sm"
              />
            </div>
          </div>
        </div>
        <img
          src={props.image}
          key={props.slug}
          alt={props.title}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default Slide;
