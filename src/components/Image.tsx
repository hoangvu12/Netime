import React from "react";
import { Img, ImgProps } from "react-image";
import classNames from "classnames";
import Skeleton from "./Skeleton";

const Image = (props: ImgProps) => {
  return (
    <Img
      loader={
        <Skeleton>
          <div className={classNames("bg-gray-600", props.className)}></div>
        </Skeleton>
      }
      unloader={
        <div
          className={classNames(
            "flex items-center justify-center",
            props.className
          )}
        >
          <h1 className="text-white text-base">
            Lỗi khi load ảnh {props.alt || ""}
          </h1>
        </div>
      }
      {...props}
    />
  );
};

export default Image;
