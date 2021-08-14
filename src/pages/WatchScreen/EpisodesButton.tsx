import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ImStack } from "react-icons/im";
import classNames from "classnames";

interface EpisodesButtonProps {
  episodes: string[];
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
        <Menu.Items className="rounded-md text-white overflow-y-scroll absolute space-y-2 right-0 bottom-full p-6 h-60 w-56 mt-2 origin-top-right bg-background shadow-lg focus:outline-none">
          <h1 className="text-white font-medium">Tập phim</h1>
          <div className="w-full space-y-2">
            {props.episodes.map((episode, index) => (
              <Menu.Item
                key={index}
                as="button"
                className={classNames(
                  "p-3 block min-w-full rounded-md m-1 hover:bg-opacity-80 line-clamp-5",
                  index === props.activeIndex
                    ? "bg-primary text-white"
                    : "bg-background-lighter"
                )}
                onClick={() => {
                  props?.onClick?.(episode, index);
                }}
              >
                {episode}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default EpisodesButton;
