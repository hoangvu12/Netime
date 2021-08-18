import React from "react";
import { Img, ImgProps } from "react-image";
import classNames from "classnames";
import Skeleton from "./Skeleton";

const allowedTexts = ["w-", "h-", "mr-", "ml", "my", "mx", "px", "py"];

const isAllowedText = (text: string) =>
  allowedTexts.find((allowedText) => text.includes(allowedText));

const Image = (props: ImgProps) => {
  const classes = props.className?.split(" ").filter(isAllowedText);

  return (
    <Img
      loader={
        <Skeleton>
          <div className={classNames("bg-gray-600", classes)}></div>
        </Skeleton>
      }
      unloader={
        <div
          className={classNames(
            "flex items-center justify-center p-4",
            classes
          )}
        >
          <h1 className="text-center text-white text-base">
            Lỗi khi load ảnh {props.alt || ""}
          </h1>
        </div>
      }
      {...props}
    />
  );
};

export default Image;
