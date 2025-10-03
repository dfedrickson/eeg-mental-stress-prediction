import React, { useEffect, useState } from "react";

const ThemeToggle = ({ onToggle }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
      onToggle?.(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
      onToggle?.(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setDarkMode(false);
      onToggle?.(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setDarkMode(true);
      onToggle?.(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
        darkMode ? "bg-blue-600" : "bg-gray-400"
      }`}
    >
      <div
        className={`w-5 h-5 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform ${
          darkMode ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {darkMode ? "🌙" : "☀️"}
      </div>
    </button>
  );
};

export default ThemeToggle;
