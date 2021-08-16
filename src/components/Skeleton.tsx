import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton = (props: PropsWithChildren<SkeletonProps>) => {
  return (
    <div className={classNames("animate-pulse", props.className)}>
      {props.children}
    </div>
  );
};

export default Skeleton;
