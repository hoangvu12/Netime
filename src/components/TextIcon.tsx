import classNames from "classnames";
import React from "react";

interface TextIconProps {
  className?: string;
  textClassName?: string;
  iconClassName?: string;
  icon: React.ComponentType<{ className?: string; size: number }>;
  text: string;
  iconSize?: number;
}

const TextIcon = (props: TextIconProps) => {
  const {
    iconSize = 16,
    icon: Icon,
    className,
    iconClassName,
    textClassName,
    text,
  } = props;

  return (
    <div className={classNames("flex items-center", className)}>
      <Icon size={iconSize} className={iconClassName} />
      <p className={classNames("line-clamp-1", textClassName)}>{text}</p>
    </div>
  );
};

export default TextIcon;
