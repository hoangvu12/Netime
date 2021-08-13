import React, { Fragment, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Transition } from "@headlessui/react";
import classNames from "classnames";
import { Anime } from "../types";

import searchList from "../data/latestAnime.json";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Search = () => {
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<Anime[] | []>([]);
  const timeout = useRef<NodeJS.Timeout | undefined>();

  const handleKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setKeyword(e.target.value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(async () => {
      setIsLoading(true);
      await sleep(1000);

      setList(searchList);
      setIsLoading(false);
    }, 1000);
  };

  const handleShowResultPanel = (isVisible: boolean) => {
    return () => {
      setShowResultPanel(isVisible);
    };
  };

  return (
    <div className="relative w-min">
      <div className="flex items-center p-2 rounded-md bg-background-darker">
        <AiOutlineSearch size={20} className="text-gray-500 mr-2" />
        <input
          onFocus={handleShowResultPanel(true)}
          onBlur={handleShowResultPanel(false)}
          type="text"
          placeholder="Tìm kiém"
          onChange={handleKeywordChange}
          className="bg-transparent placeholder-gray-500 text-gray-300 focus:outline-none focus:border-none"
        />
      </div>
      <Transition
        show={showResultPanel}
        as={Fragment}
        enter="transition duration-300 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-300 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className={classNames(
            "absolute space-y-2 w-full max-h-60 overflow-y-scroll p-3 rounded-b-md bg-background-darker"
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center w-full">
              <Loader />
            </div>
          ) : (
            list.map((anime) => (
              <div
                className="flex w-full cursor-pointer rounded-sm p-2 hover:bg-white hover:bg-opacity-10"
                key={anime.slug}
              >
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="min-w-1/4 max-w-1/4 object-cover h-20 mr-2"
                />

                <div className="space-y-2">
                  <h1 className="text-white text-sm font-medium line-clamp-1">
                    {anime.title}
                  </h1>
                  <p className="text-gray-400 line-clamp-2 text-xs">
                    {anime.description}
                  </p>
                </div>
              </div>
            ))
          )}

          <Link to="/search">
            <div className="flex items-center p-2 rounded-sm cursor-pointer hover:bg-white hover:bg-opacity-10">
              <div className="bg-secondary p-2 rounded-full mr-2">
                <AiOutlineSearch size={20} className="text-white" />
              </div>

              <div className="text-secondary text-base font-medium">
                Tìm kiếm <strong>{keyword}</strong>
              </div>
            </div>
          </Link>
        </div>
      </Transition>
    </div>
  );
};

export default Search;
