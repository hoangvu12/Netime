import classNames from "classnames";
import { To } from "history";
import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../types";

interface ButtonRawProps extends React.HTMLAttributes<HTMLButtonElement> {
  startIcon?: React.ComponentType<Icon>;
  endIcon?: React.ComponentType<Icon>;
  iconSize?: number;
  iconClassName?: string;
}

interface ButtonProps extends ButtonRawProps {
  onClick?: () => void;
  to?: To;
}

const ButtonRaw = (props: ButtonRawProps) => {
  const {
    className,
    iconSize = 16,
    iconClassName,
    startIcon: StartIcon,
    endIcon: EndIcon,

    ...buttonProps
  } = props;
  return (
    <button
      className={classNames(
        "flex items-center px-4 py-2 rounded-md font-medium text-xs md:text-sm lg:text-base hover:bg-opacity-80",
        className
      )}
      {...buttonProps}
    >
      {StartIcon && (
        <StartIcon
          size={iconSize}
          className={classNames("mr-2", iconClassName)}
        />
      )}
      {props.children}

      {EndIcon && (
        <EndIcon
          size={iconSize}
          className={classNames("ml-2", iconClassName)}
        />
      )}
    </button>
  );
};

const Button = (props: ButtonProps) => {
  const { onClick, to, ...buttonProps } = props;

  return to ? (
    <Link to={to}>
      <ButtonRaw {...buttonProps} />
    </Link>
  ) : (
    <ButtonRaw {...buttonProps} onClick={onClick} />
  );
};

export default Button;
