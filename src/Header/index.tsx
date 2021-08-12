import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { RouteMatch } from "react-router";
import Tooltip from "../components/Tooltip";
import routes from "../routes";
import NavButton from "./NavButton";
import NavDisclosure from "./NavDisclosure";

interface HeaderProps {
  matchedRoute?: RouteMatch | undefined;
}

const headerRoutes = routes.filter((route) => route.header);

const Header = ({ matchedRoute }: HeaderProps) => {
  return (
    <Disclosure
      as="div"
      className={classNames(
        "fixed z-10 px-4 flex justify-center items-center w-screen h-16 bg-background-lighter"
      )}
    >
      {({ open }) => (
        <>
          <div className="absolute left-0 p-in">
            <img src="/logo.png" alt="logo" />
          </div>

          <div className="md:hidden absolute right-0 p-in flex justify-center items-center">
            <Disclosure.Button className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {open ? (
                <AiOutlineClose size={20} className="text-white" />
              ) : (
                <AiOutlineMenu size={20} className="text-white" />
              )}
            </Disclosure.Button>
          </div>

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
                  <Tooltip.Panel className="flex w-96 h-52 flex-wrap justify-between items-center bg-background-darker text-primary border-t-2 border-primary rounded-md rounded-t-none">
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

          <Disclosure.Panel static className="relative lg:hidden">
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
              <div className="w-60 h-screen p-4 space-y-2 absolute bg-background-darker top-8 right-3">
                {headerRoutes.map((route) =>
                  !route.dropdown ? (
                    <NavButton
                      to={route.path}
                      text={route.name}
                      active={matchedRoute?.route.path === route.path}
                      key={route.path}
                    />
                  ) : (
                    <NavDisclosure
                      button={
                        <NavButton
                          redirect={false}
                          text={route.name}
                          className="flex items-center justify-between"
                          active={matchedRoute?.route.path === route.path}
                          endIcon={BsChevronDown}
                        />
                      }
                      className="space-y-2"
                      panelClassName="space-y-1 bg-background-lighter p-2"
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
                    </NavDisclosure>
                  )
                )}
              </div>
            </Transition>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
