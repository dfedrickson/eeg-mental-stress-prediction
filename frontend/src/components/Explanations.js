import React from "react";
import FeatureImportanceChart from "./shared/FeatureImportanceChart";
import PlaceholderChart from "./shared/PlaceholderChart";

const Explanations = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Model Explanations</h2>
    <FeatureImportanceChart />
    <PlaceholderChart title="LIME Explanations Visualization" height={380} />
  </div>
);

export default Explanations;
