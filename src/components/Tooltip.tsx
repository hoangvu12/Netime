import classNames from "classnames";
import React, { PropsWithChildren } from "react";

interface TooltipProps {
  className?: string;
}

const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  return (
    <div className={classNames("tooltip relative", props.className)}>
      {props.children}
    </div>
  );
};

interface TooltipPanelProps {
  className?: string;
}

Tooltip.Panel = (props: PropsWithChildren<TooltipPanelProps>) => {
  return (
    <div
      className={classNames(
        "tooltip-panel mt-1 overflow-y-scroll px-4 py-2 absolute",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Tooltip;
