import {  } from "react";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import userImage from "../../assets/user.jpg";
import { checkObjectEmpty } from "../../utils/utilFunctions";
import useHeader from "../../hooks/useHeader";
import useSignout from "../../hooks/useSignout";

const Header = () => {

 
  const {
    isDarkMode,
    toggleTheme,
    isMenuOpen,
    setIsMenuOpen,
    showUserDialog,
    setShowUserDialog,
    user,
    resetUser
  } = useHeader();
  const {handleSignOut} = useSignout();

  return (
    <nav className="bg-slate-200 z-50 dark:bg-gray-800 max-h-16 shadow-md w-full sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to={"/"} className="flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
            OpenDoor
          </Link>

          {/* Search Box */}
          <div className="block w-full max-w-md mx-6">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden relative md:flex items-center space-x-6">
            <Link
              to={"/"}
              className="text-gray-900 dark:text-white hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              className="text-gray-900 dark:text-white hover:text-blue-500"
            >
              About
            </Link>

            {checkObjectEmpty(user) ? (
              <Link
                to={"/signin"}
                className="text-gray-900 dark:text-white hover:text-blue-500"
              >
                Sign In
              </Link>
            ) : (
              <div>
                <a
                  onClick={() => setShowUserDialog(!showUserDialog)}
                  className="cursor-pointer"
                >
                  <div className="h-full bg-gray-800 w-10 rounded-full overflow-hidden hover:outline outline-[#0000004f]">
                    <img  referrerPolicy="no-referrer" className="w-full h-full bg-slate-mo grid place-content-center" src={user?.profileImage || userImage} alt="User" />
                  </div>
                </a>
                {showUserDialog && (
                  <div className="absolute right-8 w-52 top-12 drop-shadow-md  dark:text-white bg-slate-300 dark:bg-slate-800 flex flex-col rounded-md gap-2 p-2">
                    <Link to={"/profile"} className="px-2 grid place-items-center py-1 cursor-pointer  rounded-lg w-full dark:hover:bg-slate-600 hover:bg-slate-200">
                      Profile
                    </Link>
                    <a onClick={async () => await handleSignOut()} className="px-2 grid place-items-center py-1 cursor-pointer  rounded-lg w-full hover:bg-opacity-50 bg-red-400">
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            )}

            <button onClick={toggleTheme} className="focus:outline-none">
              {isDarkMode ? (
                <FiSun className="text-2xl text-yellow-500" />
              ) : (
                <FiMoon className="text-2xl text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl focus:outline-none"
            >
              <FiMenu className="text-gray-900 dark:text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-2 px-2 pt-2 pb-3 sm:px-3">
              <Link
                to="home"
                className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Home
              </Link>
              <Link
                to="about"
                className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                About
              </Link>
              <Link
                to="signin"
                className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Sign In
              </Link>


              <div className="flex items-center justify-between px-3 py-2">
                <FaUserCircle className="text-3xl text-gray-900 dark:text-white cursor-pointer" />
                <button onClick={toggleTheme} className="focus:outline-none">
                  {isDarkMode ? (
                    <FiSun className="text-2xl text-yellow-500" />
                  ) : (
                    <FiMoon className="text-2xl text-gray-900" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
