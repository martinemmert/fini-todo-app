import * as React from "react";
import TablerIcon from "../TablerIcon";

const Navbar = () => {
  return (
    <header className="sticky top-0 flex items-center h-20 bg-gray-800">
      <img
        src="/assets/Logo.svg"
        alt="fini logo"
        className="relative block ml-12 logo"
      />
      <nav className="ml-auto mr-8">
        <button className="text-gray-200 transition-opacity duration-150 ease-out opacity-50 hover:opacity-100">
          <TablerIcon iconName="power" className="w-8 h-8" />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;