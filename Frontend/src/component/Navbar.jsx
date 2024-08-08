import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className=" myContainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Manager/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white  my-5 rounded-md flex  justify-between items-center">
          <img
            className="invert w-10 p-1 "
            src="icons/github.png"
            alt="Github"
          />
          <span className="font-bold text-xl px-2">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
