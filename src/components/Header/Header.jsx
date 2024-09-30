import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex justify-between items-center py-2 px-3 md:px-10 bg-slate-100 relative">
      <div className="logo font-extrabold text-lg md:text-2xl">
        <span className="text-slate-700">Open</span>
        <span className="text-blue-400">Door</span>
      </div>

      <div className="search-box flex text-base gap-2 justify-between w-[60%] md:w-80 px-3 h-8 md:h-10 bg-white rounded-md items-center">
        <input
          type="text"
          className="outline-none h-full w-[80%]"
          placeholder="Search here.."
        />
        <div className="text-xl w-[15%] grid place-content-center font-bold">
          <IoIosSearch />
        </div>
      </div>

      <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
        {isOpen ? <MdClose /> : <GiHamburgerMenu />}
      </div>

      <nav
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col md:flex md:flex-row absolute md:static top-12 right-0 md:top-auto md:right-auto bg-slate-100 md:bg-transparent w-full md:w-auto md:gap-6 text-center md:text-left py-2 md:py-0 md:pl-0 pl-4`}
      >
        <Link to="/" className="py-2 md:py-0">
          Home
        </Link>
        <Link to="/about" className="py-2 md:py-0">
          About
        </Link>
        <Link to="/signin" className="py-2 md:py-0">
          Signin
        </Link>
      </nav>
    </header>
  );
}

export default Header;
