import classNames from "classnames";
import React from "react";

interface AnimeCardSkeletonProps {
  className?: string;
}

const AnimeCardSkeleton = (props: AnimeCardSkeletonProps) => {
  return (
    <div className={classNames("-space-x-2 px-2", props.className)}>
      <div className="w-full h-48 md:h-60 lg:h-80">
        <div className="bg-gray-600 w-full h-full"></div>
      </div>
    </div>
  );
};

export default AnimeCardSkeleton;
