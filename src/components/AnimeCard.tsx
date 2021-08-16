import classNames from "classnames";
import React from "react";
import {
  AiFillPlayCircle,
  AiFillStar,
  AiOutlineCalendar,
} from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Anime } from "../types";
import Image from "./Image";
import TextIcon from "./TextIcon";

interface AnimeCardProps extends Anime {
  className?: string;
}

const AnimeCard = (props: AnimeCardProps) => {
  return (
    <Link to={`/info/${props.slug}`}>
      <div className={classNames("relative shadow-lg group", props.className)}>
        <Image
          src={props.image}
          alt={props.title}
          className={classNames(
            "w-full h-48 md:h-60 lg:h-80 object-cover rounded-md rounded-b-none"
          )}
        />

        {props.isUpcoming && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <p className="text-white font-medium text-xl">
              {props.upcomingYear}
            </p>
          </div>
        )}

        <div className="absolute inset-0 invisible group-hover:visible bg-black bg-opacity-60 flex items-center justify-center">
          <AiFillPlayCircle size={50} className="text-white" />
        </div>

        <div className="absolute top-2 left-2 bg-black px-2 py-1 rounded-md text-white text-xs bg-opacity-80">
          {props.time}
        </div>
      </div>
      <div
        className={classNames(
          "bg-background-darker p-3 w-full space-y-2 rounded-b-md min-h-11"
        )}
      >
        <p className="uppercase text-white font-medium text-sm line-clamp-2">
          {props.title}
        </p>

        <div className="space-y-1">
          <div className="flex items-center">
            <TextIcon
              icon={AiFillStar}
              iconClassName="text-yellow-400 mr-1"
              text={props.stars.toString()}
              textClassName="text-yellow-400 text-xs"
              iconSize={12}
            />

            {props.time && (
              <TextIcon
                className="ml-2"
                icon={BiTime}
                iconClassName="text-gray-400 mr-1"
                text={props.time}
                textClassName="text-white text-xs"
                iconSize={12}
              />
            )}

            <p className="px-2 ml-2 text-xs font-medium bg-primary text-white rounded-md">
              {props.quality}
            </p>
          </div>

          {props.date && (
            <TextIcon
              icon={AiOutlineCalendar}
              iconClassName="text-gray-400 mr-1"
              text={props.date}
              textClassName="text-white text-xs"
              iconSize={12}
            />
          )}
        </div>

        <p className="text-gray-400 text-xs line-clamp-3">
          {props.description}
        </p>
      </div>
    </Link>
  );
};

export default AnimeCard;
