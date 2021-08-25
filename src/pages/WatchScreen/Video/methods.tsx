import classNames from "classnames";
import ReactDOM from "react-dom";

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
