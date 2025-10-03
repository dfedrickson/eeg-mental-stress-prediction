import React from "react";

const NavigationButton = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
        ${active
          ? "shadow-md scale-105"
          : "hover:shadow-sm hover:scale-105"
        }`}
      style={{
        backgroundColor: active ? "var(--nav-active-bg)" : "transparent",
        color: active ? "var(--nav-active-text)" : "var(--sidebar-text)",
      }}
    >
      <span className="mr-3 flex-shrink-0">{icon}</span>
      {label && <span className="truncate">{label}</span>}
    </button>
  );
};

export default NavigationButton;
