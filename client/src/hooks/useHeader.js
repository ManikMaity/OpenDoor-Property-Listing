import { useEffect, useState } from "react";
import useUserStore from "../store/userStore";

function useHeader() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showUserDialog, setShowUserDialog] = useState(false);
    const { user, resetUser } = useUserStore();
  
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


    return {
        isDarkMode,
        toggleTheme,
        isMenuOpen,
        setIsMenuOpen,
        showUserDialog,
        setShowUserDialog,
        user,
        resetUser
    }
}

export default useHeader
