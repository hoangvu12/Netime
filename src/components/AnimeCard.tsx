import classNames from "classnames";
import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Anime } from "../types";
import Image from "./Image";

interface AnimeCardProps extends Anime {
  className?: string;
}

const AnimeCard = (props: AnimeCardProps) => {
  return (
    <Link to={`/info/${props.slug}`}>
      <div className={classNames("relative shadow-lg group", props.className)}>
        <Image
          src={props.thumbnail}
          alt={props.name}
          className={classNames(
            "w-full h-32 object-cover rounded-md rounded-b-none"
          )}
        />

        <div className="absolute inset-0 invisible group-hover:visible bg-black bg-opacity-60 flex items-center justify-center">
          <AiFillPlayCircle size={50} className="text-white" />
        </div>

        <div className="px-2 py-1 absolute top-2 left-2 max-w-24 bg-black rounded-md bg-opacity-80">
          <p className="text-white text-xs line-clamp-1">
            {props.time || props.latestEpisode?.name}
          </p>
        </div>
      </div>
      <div
        className={classNames(
          "bg-background-darker p-3 w-full space-y-2 rounded-b-md min-h-4"
        )}
      >
        <p className="uppercase text-white font-medium text-sm line-clamp-2">
          {props.name}
        </p>
      </div>
    </Link>
  );
};

export default AnimeCard;
