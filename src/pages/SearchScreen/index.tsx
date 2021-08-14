import React from "react";
import Image from "../../components/Image";

const URL =
  "https://lh1.googleusercontent.com/AWgUjHwZS4EgnGx0ArMHQmjrhujTUBZcUYreLPrY3OxnVsZ8V4OhGoyA8dOJ95cg70k=s0";

const index = () => {
  return (
    <div>
      <Image src={URL} className="h-60 w-40" alt="Yo" />
    </div>
  );
};

export default index;
