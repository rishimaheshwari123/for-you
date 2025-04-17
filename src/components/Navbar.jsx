import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.gif";

const Navbar = () => {
  return (
    <nav className="bg-white text-cyan-600  shadow-md ">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex gap-2 items-center  ">
          <img src={logo} alt="not found" className="w-16" />
          <p className="text-xl font-bold text-cyan-600">For You</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
