import React, { useState } from "react";
import { useLocation } from "react-router";
import AnimeCard from "../../components/AnimeCard";
import Select from "../../components/Select";
import { GENRES, SEASONS, SORTS, TYPES } from "../../constants";

const ALL = [...TYPES, ...GENRES, ...SEASONS];

const TypeScreen = () => {
  const [selectedSorting, setSelectedSorting] = useState(SORTS[0].slug);

  const handleSortingSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSorting(e.target.value);
  };

  const location = useLocation();

  const current = ALL.find((type) => location.pathname.includes(type.slug));

  return (
    <h1>Đang làm owo</h1>

    // <div className="w-full">
    //   <div className="w-full p-2">
    //     <div className="flex items-center justify-between">
    //       <p className="text-white font-bold text-4xl">{current?.name}</p>

    //       <Select
    //         value={selectedSorting}
    //         onChange={handleSortingSelectChange}
    //         className="bg-black text-white p-2"
    //       >
    //         {SORTS.map((sort) => (
    //           <option value={sort.slug} key={sort.slug}>
    //             {sort.name}
    //           </option>
    //         ))}
    //       </Select>
    //     </div>

    //     <div className="my-12 flex justify-evenly flex-wrap">
    //       {latest.map((anime) => (
    //         <div className="mt-2 w-44" key={anime.slug}>
    //           <AnimeCard {...anime} />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default TypeScreen;
