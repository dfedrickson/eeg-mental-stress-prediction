import React, { useState } from "react";
import {
  FiHome,
  FiUpload,
  FiActivity,
  FiBarChart2,
  FiFileText,
  FiMenu,
} from "react-icons/fi"; // Feather icons
import NavigationButton from "./shared/NavigationButton";
import Dashboard from "./Dashboard";
import DataUpload from "./DataUpload";
import StressPrediction from "./StressPrediction";
import Explanations from "./Explanations";
import Reports from "./Reports";
import ThemeToggle from "./ThemeToggle";
import brainLogo from "./assets/brain.png"; // adjust path to your logo


const EEGMSP = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "upload":
        return <DataUpload />;
      case "prediction":
        return <StressPrediction />;
      case "explanations":
        return <Explanations />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-gray-800 shadow-md p-4 flex flex-col transition-all duration-300`} 
        style={{ backgroundColor: "var(--sidebar-bg)", color: "var(--sidebar-text)" }}
      >

      {/* Sidebar Header */}
      <div className="flex items-center mb-6 px-2 justify-between h-[50px] overflow-hidden">
        <div
          className={`flex items-center font-bold text-xl transition-all duration-300 ease-in-out
            ${isSidebarOpen ? "opacity-100 w-full" : "opacity-0 w-0 overflow-hidden"}`}
        >
        <img
          src={brainLogo}
          alt="Brain Logo"
          className="mr-3 flex-shrink-0"
          style={{ width: "45px", height: "45px" }} 
        />
        <span className="font-bold text-xl break-words max-w-[120px] leading-tight mr-3">
            NeuroStress Insight
          </span>
          <FiMenu
            className="ml-2 cursor-pointer flex-shrink-0"
            size={24}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Sidebar closed: show only menu button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="ml-2 cursor-pointer flex-shrink-0rounded-lg hover:bg-secondary transition flex items-center justify-center"
          >
            <FiMenu size={24} />
          </button>
        )}
      </div>

        {/* Navigation */}
        <div className="space-y-2 flex-1">
          <NavigationButton
            icon={<FiHome size={18} />}
            label={isSidebarOpen ? "Dashboard" : ""}
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavigationButton
            icon={<FiUpload size={18} />}
            label={isSidebarOpen ? "Data Upload" : ""}
            active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          />
          <NavigationButton
            icon={<FiActivity size={18} />}
            label={isSidebarOpen ? "Stress Prediction" : ""}
            active={activeTab === "prediction"}
            onClick={() => setActiveTab("prediction")}
          />
          <NavigationButton
            icon={<FiBarChart2 size={18} />}
            label={isSidebarOpen ? "Explanations" : ""}
            active={activeTab === "explanations"}
            onClick={() => setActiveTab("explanations")}
          />
          <NavigationButton
            icon={<FiFileText size={18} />}
            label={isSidebarOpen ? "Reports" : ""}
            active={activeTab === "reports"}
            onClick={() => setActiveTab("reports")}
          />
        </div>

        {/* Theme Toggle always at bottom */}
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto"
      style={{ backgroundColor: "var(--main-bg)", color: "var(--main-text)" }}
      >
        {renderContent()}</div>
    </div>
  );
};

export default EEGMSP;
