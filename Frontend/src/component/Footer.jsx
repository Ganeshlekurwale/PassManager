import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white text-center fixed bottom-0 w-full">
      <div className="container mx-auto flex flex-col items-center gap-1">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Manager/&gt;</span>
        </div>
        <p className="text-xs text-gray-400">
          Your trusted password management solution.
        </p>
        <p className="text-xs">
          &copy; 2025-26 <span className="text-red-500 text-lg">❤️</span> Built
          with passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
