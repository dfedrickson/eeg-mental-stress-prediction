import React from "react";

const PlaceholderChart = ({ title, height = 300 }) => (
  <div
    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center justify-center"
    style={{ height }}
  >
    <div className="text-gray-500 dark:text-gray-400 text-sm">
      Chart: {title}
    </div>
  </div>
);

export default PlaceholderChart;
