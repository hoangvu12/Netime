import classNames from "classnames";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { Episode as EpisodeType } from "../types";
import Disclosure from "./Disclosure";
import Episode from "./Episode";

interface EpisodeChunkButtonProps {
  title: string;
}

const EpisodeChunkButton: React.FC<EpisodeChunkButtonProps> = (props) => {
  return (
    <div className="w-full flex items-center justify-between py-2 px-4">
      <p className="text-white text-xl">{props.title}</p>

      <BsChevronDown className="w-6 h-6 text-white" />
    </div>
  );
};

interface EpisodeChunkProps {
  episodes: EpisodeType[];
  title: string;
  className?: string;
  buttonClassName?: string;
  activeName?: number;
  episodeOnClick?: (episode: EpisodeType, index: number) => void;
  open?: boolean;
}

const EpisodeChunk: React.FC<EpisodeChunkProps> = (props) => {
  return (
    <Disclosure
      className={classNames(props.className)}
      buttonClassName={classNames("w-full rounded-md", props.buttonClassName)}
      button={<EpisodeChunkButton title={props.title} />}
      defaultOpen={props.open}
    >
      {props.episodes.map((episode, index) => (
        <Episode
          {...episode}
          key={episode.slug}
          active={props.activeName === episode.name}
          onClick={() => props?.episodeOnClick?.(episode, episode.name - 1)}
        />
      ))}
    </Disclosure>
  );
};

export default EpisodeChunk;
