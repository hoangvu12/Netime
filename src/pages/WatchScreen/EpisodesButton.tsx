import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ImStack } from "react-icons/im";
import EpisodeChunk from "../../components/EpisodeChunk";
import { Episode as EpisodeType } from "../../types";
import { chunk } from "../../utils";

interface EpisodesButtonProps {
  episodes: EpisodeType[];
  onClick?: (
    episode: EpisodesButtonProps["episodes"][number],
    index: number
  ) => void;
  activeIndex?: number;
}

const EpisodesButton = (props: EpisodesButtonProps) => {
  return (
    <Menu>
      <Menu.Button>
        <ImStack size={18} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="no-tap-highlight rounded-md text-white overflow-y-scroll absolute space-y-2 right-0 bottom-full p-6 h-96 w-32rem mt-2 origin-top-right bg-background shadow-lg focus:outline-none">
          <div className="w-full space-y-2">
            {chunk<EpisodeType>(props?.episodes!, 18).map((chunk, i) => {
              const { activeIndex } = props;

              const firstEpisode = chunk[0];
              const lastEpisode = chunk[chunk.length - 1];
              const activeEpisode = props.episodes[activeIndex!];

              const isOpen = chunk.some(
                (episode) => episode.name - 1 === activeIndex
              );

              return (
                <EpisodeChunk
                  buttonClassName="episode-buttons bg-background-darker"
                  title={`Tập ${firstEpisode.name} - Tập ${lastEpisode.name}`}
                  episodes={chunk}
                  key={i}
                  activeName={activeEpisode.name}
                  episodeOnClick={props.onClick}
                  open={!!isOpen}
                />
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default EpisodesButton;
