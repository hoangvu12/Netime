import React from "react";
import { RouteMatch } from "react-router";
import Tooltip from "../components/Tooltip";
import routes from "../routes";
import NavButton from "./NavButton";

const headerRoutes = routes.filter((route) => route.header);

const DesktopMenu = ({
  matchedRoute,
}: {
  matchedRoute: RouteMatch | undefined;
}) => {
  return (
    <div className="flex-1 items-center justify-center px-4 hidden md:flex">
      {headerRoutes.map((route) =>
        !route.dropdown ? (
          <NavButton
            className="flex items-center p-2 mx-2"
            to={route.path}
            text={route.name}
            active={matchedRoute?.route.path === route.path}
            key={route.path}
          />
        ) : (
          <Tooltip key={route.path}>
            <NavButton
              className="flex items-center p-2 mx-2"
              redirect={false}
              text={route.name}
              active={matchedRoute?.route.path === route.path}
            />
            <Tooltip.Panel className="flex w-96 h-52 flex-wrap justify-between items-center bg-background-darker text-secondary border-t-2 border-secondary rounded-md rounded-t-none">
              {route.dropdownData?.map((data) => (
                <NavButton
                  text={data.name}
                  to={route.dropdownPath?.(data)}
                  key={route.listKey?.(data)}
                  className="flex items-center p-2 mx-2 w-24 overflow-ellipsis"
                />
              ))}
            </Tooltip.Panel>
          </Tooltip>
        )
      )}
    </div>
  );
};

export default DesktopMenu;
