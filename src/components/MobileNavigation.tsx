import { Menu } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import useMatchLocation from "../hooks/useMatchLocation";
import routes from "../routes";
import { Route } from "../types";

const MobileNavigation = () => {
  const matchedRoute = useMatchLocation();
  const navRoutes = routes.filter((route) => route.navigation);

  return (
    <div className="mobile-nav z-30 md:hidden py-4 px-2 w-screen flex items-center justify-center fixed bottom-0 bg-background-darker">
      {navRoutes.map(
        ({ icon, name, path, dropdown, dropdownData, dropdownPath }) => {
          const isMatchedRoute = matchedRoute?.route.path === path;

          return !dropdown ? (
            <Link to={path} key={path} className={classNames("flex-1")}>
              <NavigationButton
                icon={icon!}
                name={name}
                isActive={isMatchedRoute}
              />
            </Link>
          ) : (
            <Menu
              as="div"
              className="flex-1 flex justify-center items-center relative"
              key={path}
            >
              <Menu.Button>
                <NavigationButton
                  icon={icon!}
                  name={name}
                  isActive={isMatchedRoute}
                />
              </Menu.Button>

              <Menu.Items className="no-tap-highlight rounded-lg text-white overflow-y-scroll absolute space-y-10 bottom-full mb-4 w-40 border border-secondary p-4 h-96 bg-background-darker shadow-lg focus:outline-none">
                {dropdownData?.map((data) => {
                  return (
                    <Link to={dropdownPath?.(data)!} key={data.slug}>
                      <h1>{data.name}</h1>
                    </Link>
                  );
                })}
              </Menu.Items>
            </Menu>
          );
        }
      )}
    </div>
  );
};

interface NavigationButtonProps {
  isActive?: boolean;
  icon: Route["icon"];
  name: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  isActive,
  icon: Icon,
  name,
}) => (
  <div
    className={classNames(
      "flex flex-col justify-center items-center grow",
      isActive ? "text-secondary" : "text-white"
    )}
  >
    {Icon && <Icon className="w-6 h-6" />}
    <h1 className="line-clamp-1">{name}</h1>
  </div>
);

export default MobileNavigation;
