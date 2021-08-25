import React from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";
import useMatchLocation from "../hooks/useMatchLocation";
import DesktopMenu from "./DesktopMenu";
import Search from "./Search";

const Header = () => {
  const matchedRoute = useMatchLocation();

  return (
    <div className="fixed z-30 px-4 flex justify-center items-center w-screen h-16 bg-background-lighter">
      <div className="absolute left-0 p-in">
        <Link to="/">
          <Image src="/logo.png" alt="logo" />
        </Link>
      </div>

      <div className="md:hidden absolute right-0 p-in flex justify-center items-center"></div>

      <DesktopMenu matchedRoute={matchedRoute} />

      <div className="hidden md:block absolute right-0 p-in">
        <Search />
      </div>
    </div>
  );
};

export default Header;
