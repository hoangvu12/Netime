import { Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import SearchAnimeCard from "./SearchAnimeCard";
import useSearch from "../../hooks/useSearch";
import Input from "../../components/Input";

const Search = () => {
  const [showResultPanel, setShowResultPanel] = useState(false);
  const [keyword, setKeyword] = useState("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading, refetch } = useSearch({
    keyword,
    limit: 12,
    enabled: false,
  });

  const handleKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setKeyword(e.target.value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => refetch(), 1000);
  };

  const handleShowResultPanel = (isVisible: boolean) => {
    return () => {
      setShowResultPanel(isVisible);
    };
  };

  const list = data?.pages.map((page) => page.data).flat();

  return (
    <div className="relative w-min">
      <div className="flex items-center p-2 rounded-md bg-background-darker">
        <AiOutlineSearch size={20} className="text-gray-500 mr-2" />
        <Input
          onFocus={handleShowResultPanel(true)}
          onBlur={handleShowResultPanel(false)}
          type="text"
          placeholder="Tìm kiếm"
          onChange={handleKeywordChange}
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
            <div className="flex items-center py-2 justify-center w-full">
              <Loader />
            </div>
          ) : (
            list?.map((anime) => (
              <SearchAnimeCard key={anime.slug} {...anime} />
            ))
          )}

          <Link to={`/search?q=${keyword}`}>
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
