import React from "react";
import { Link } from "react-router-dom";

const LeftNav = () => {
  return (
    <div className="invisible md:visible flex">
      <Link to="/">
        <img
          className="object-scale-down h-20"
          src="/assets/logo.jpg"
          alt="Bao Tin logo"
        />
      </Link>
    </div>
  );
};

export default LeftNav;
