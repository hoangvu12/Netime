import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import React from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { RouteMatch } from "react-router";
import { Link } from "react-router-dom";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Search from "./Search";
interface HeaderProps {
  matchedRoute?: RouteMatch | undefined;
}

const Header = ({ matchedRoute }: HeaderProps) => {
  return (
    <Disclosure
      as="div"
      className={classNames(
        "fixed z-30 px-4 flex justify-center items-center w-screen h-16 bg-background-lighter"
      )}
    >
      {({ open }) => (
        <>
          <div className="absolute left-0 p-in">
            <Link to="/">
              <img src="/logo.png" alt="logo" />
            </Link>
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

          <DesktopMenu matchedRoute={matchedRoute} />

          <div className="hidden md:block absolute right-0 p-in">
            <Search />
          </div>

          <Disclosure.Panel static className="lg:hidden">
            <MobileMenu open={open} matchedRoute={matchedRoute} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
