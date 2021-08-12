import React from "react";
import { ImSpinner2 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImSpinner2 size={20} className="text-white animate-spin" />
    </div>
  );
};

export default Loader;
