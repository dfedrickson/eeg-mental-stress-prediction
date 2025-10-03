import React, { useState } from "react";
import EEGStressDetectionSystem from "./components/EEGMSP";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="App">
      <EEGStressDetectionSystem activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;