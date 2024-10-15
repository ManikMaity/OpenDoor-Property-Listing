import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <nav className="bg-slate-200 dark:bg-gray-800 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 text-2xl font-bold text-gray-900 dark:text-white">
            OpenDoor
          </div>

          {/* Search Box */}
          <div className="block w-full max-w-md mx-6">
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to={"/"}
              className="text-gray-900 dark:text-white hover:text-blue-500"
            >
              Home
            </Link>
            <Link to={"/about"}
              className="text-gray-900 dark:text-white hover:text-blue-500"
            >
              About
            </Link>
            <Link to={"/sign-in"}
              className="text-gray-900 dark:text-white hover:text-blue-500"
            >
              Sign In
            </Link>
            <FaUserCircle className="text-3xl text-gray-900 dark:text-white cursor-pointer" />
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
              <a
                href="#home"
                className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Home
              </a>
              <a
                href="#about"
                className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                About
              </a>
              <a
                href="#signin"
                className="block text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Sign In
              </a>
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
