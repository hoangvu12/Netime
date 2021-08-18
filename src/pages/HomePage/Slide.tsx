import React from "react";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import Image from "../../components/Image";
import TextIcon from "../../components/TextIcon";
import { Anime } from "../../types";

const Slide = (props: Anime) => {
  return (
    <Link to={`/info/${props.slug}`}>
      <div className="relative h-80">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent rounded-md to-black bg-opacity-80">
          <div className="absolute bottom-0 w-2/3 space-y-2 p-6">
            <h1 className="text-white text-3xl line-clamp-2 font-medium">
              {props.name}
            </h1>

            <div className="flex items-center">
              <TextIcon
                icon={BiTime}
                iconClassName="text-gray-400 mr-1"
                text={props.views.toString()!}
                textClassName="text-white text-sm"
              />
            </div>
          </div>
        </div>
        <Image
          src={props.thumbnail!}
          alt={props.name}
          className="rounded-md w-full h-full object-cover"
        />
      </div>
    </Link>
  );
};

export default Slide;
