import React from "react";
import { Episode as EpisodeType } from "../types";
import { numberWithCommas } from "../utils";
import Image from "./Image";

interface EpisodeProps extends EpisodeType {
  active?: boolean;
  onClick?: () => void;
}

const Episode = (props: EpisodeProps) => {
  return (
    <div
      onClick={props.onClick}
      className="border-gray-400 border-b p-4 rounded-md rounded-b-none flex items-center hover:bg-gray-600 cursor-pointer hover:bg-opacity-50"
    >
      <p className="text-gray-300 text-lg font-bold w-6 md:w-12">
        {props.name}
      </p>

      <Image
        className="h-20 max-w-36 w-1/2 object-cover mr-2 md:mr-6"
        src={props.thumbnail_medium}
      />

      <div className="flex-1 space-y-2">
        <div className="space-y-1 text-left">
          <p className="text-white text-lg font-medium line-clamp-1">
            {props.full_name}
          </p>
          <p className="text-gray-500 text-base font-medium">
            Lượt xem: {numberWithCommas(props.views)}
          </p>
        </div>
        {props.active && (
          <div className="rounded-md bg-primary px-2 py-1 w-max">Đang xem</div>
        )}
      </div>
    </div>
  );
};

export default Episode;
