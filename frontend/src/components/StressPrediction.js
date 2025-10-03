import React from "react";
import StressMeter from "./shared/StressMeter";
import PlaceholderChart from "./shared/PlaceholderChart";

const StressPrediction = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Stress Prediction</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <StressMeter level="Medium" confidence={78} />
      <PlaceholderChart title="EEG Signal Visualization" />
    </div>
    <PlaceholderChart title="Frequency Band Analysis" />
  </div>
);

export default StressPrediction;
