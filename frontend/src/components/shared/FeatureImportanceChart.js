import React from "react";

const FeatureImportanceChart = () => {
  const features = [
    { name: "Alpha Power", value: 42, impact: "positive" },
    { name: "Beta Power", value: 28, impact: "positive" },
    { name: "Theta Power", value: 15, impact: "negative" },
    { name: "Gamma Power", value: 8, impact: "neutral" },
    { name: "Entropy", value: 32, impact: "positive" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-6">
        Feature Importance (LIME Analysis)
      </h3>
      <div className="space-y-4">
        {features.map((f, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{f.name}</span>
              <span
                className={
                  f.impact === "positive"
                    ? "text-green-600"
                    : f.impact === "negative"
                    ? "text-red-600"
                    : "text-blue-600"
                }
              >
                {f.value}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  f.impact === "positive"
                    ? "bg-green-500"
                    : f.impact === "negative"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
                style={{ width: `${f.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureImportanceChart;
