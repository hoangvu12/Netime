import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";
import { RouteMatch } from "react-router";
import routes from "../routes";
import NavButton from "./NavButton";
import Disclosure from "../components/Disclosure";

const headerRoutes = routes.filter((route) => route.header);

const MobileMenu = ({
  matchedRoute,
  open,
}: {
  matchedRoute: RouteMatch | undefined;
  open: boolean;
}) => {
  return (
    <Transition
      show={open}
      as={Fragment}
      enter="transition ease-in-out duration-500 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-500 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="overflow-y-scroll w-40 h-screen px-4 py-4 pb-20 space-y-2 absolute bg-background-darker top-16 left-0">
        {headerRoutes.map((route) =>
          !route.dropdown ? (
            <div key={route.path}>
              <NavButton
                to={route.path}
                text={route.name}
                active={matchedRoute?.route.path === route.path}
              />
            </div>
          ) : (
            <Disclosure
              button={
                <NavButton
                  redirect={false}
                  text={route.name}
                  className="flex items-center justify-between"
                  active={matchedRoute?.route.path === route.path}
                  endIcon={BsChevronDown}
                />
              }
              panelClassName="bg-background-lighter p-2"
              key={route.path}
            >
              {route.dropdownData?.map((data) => (
                <NavButton
                  text={data.name}
                  to={route.dropdownPath?.(data)}
                  key={route.listKey?.(data)}
                  className="w-24 overflow-ellipsis"
                />
              ))}
            </Disclosure>
          )
        )}
      </div>
    </Transition>
  );
};

export default MobileMenu;
