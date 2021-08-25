import { PlyrInstance } from ".";
import ReactDOM from "react-dom";
import React from "react";
import PlyrControls from "./Controls";
import classNames from "classnames";

export const renderOverlayControls = (player: PlyrInstance) => {
  const wrapper = document.querySelector(".plyr--video");

  renderOverlayChild(<PlyrControls player={player} />, wrapper!, player);
};

export const renderOverlayBackground = (player: PlyrInstance) => {
  const wrapper = document.querySelector(".plyr--video");
  const div = document.createElement("div");

  const isMobile = typeof window.orientation !== "undefined";

  div.className = classNames(
    "absolute left-0 top-0 h-full w-full bg-black bg-opacity-70 transition duration-300",
    !isMobile && "hidden"
  );

  player.on("controlsshown", () => {
    div.style.opacity = "1";
  });

  player.on("controlshidden", () => {
    div.style.opacity = "0";
  });

  wrapper?.appendChild(div);
};

export const renderOverlay = (
  player: PlyrInstance,
  component: React.ReactNode
) => {
  const wrapper = document.querySelector(".plyr--video");

  React.Children.forEach(component, (child) => {
    renderOverlayChild(child, wrapper!, player);
  });
};

export const renderOverlayChild = (
  child: any,
  container: Element,
  player: PlyrInstance
) => {
  const div = document.createElement("div");
  div.style.zIndex = "1";
  div.className = "transition duration-300";
  container.appendChild(div);

  player.on("controlsshown", () => {
    div.style.opacity = "1";
  });

  player.on("controlshidden", () => {
    div.style.opacity = "0";
  });

  ReactDOM.render(<>{child}</>, div);
};

interface Button {
  component: JSX.Element;
  position: number;
  id: string;
  className?: string;
}

export const addButtons = (buttons: Button[]) => {
  buttons.forEach((button) => {
    addButton(button);
  });
};

export const addButton = (button: Button) => {
  const { component, id, position, className } = button;

  // Remove existing button if it exists.
  const existingButton = document.querySelector(`.plyr_buttons--${id}`);
  existingButton?.remove();

  const controls = document.querySelector(".plyr__controls");
  const div = document.createElement("div");
  div.className = classNames(
    "plyr__controls__item plyr__control",
    `plyr_buttons--${id}`,
    className
  );

  const controlsChildNodes = controls?.childNodes;

  if (controlsChildNodes) {
    controls?.insertBefore(
      div,
      position < 0
        ? controlsChildNodes[controlsChildNodes?.length! - 1]
        : controlsChildNodes[position - 1]
    );

    ReactDOM.render(component, div);
  }
};
