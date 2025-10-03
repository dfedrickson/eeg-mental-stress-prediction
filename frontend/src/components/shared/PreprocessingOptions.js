import React from "react";

const PreprocessingOptions = ({
  options = { filterArtifacts: true, normalizeSignal: true, removeOcular: false },
  onOptionChange,
}) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">

    {/* Heading */}
    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
      3. Preprocessing Options
    </h3>

    {/* Instruction */}
    <p className="text-sm text-gray-600 dark:text-gray-400 text-sm mb-3">
      Configure the data preprocessing steps before analysis.
    </p>

    {/* Options */}
    <div className="space-y-4">
      <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
        <input
          type="checkbox"
          checked={options.filterArtifacts}
          onChange={() =>
            onOptionChange &&
            onOptionChange({
              ...options,
              filterArtifacts: !options.filterArtifacts,
            })
          }
          className="mr-2 h-5 w-5 text-primary border-gray-400 rounded"
        />
        <span className="text-base">Filter artifacts (0.5–40 Hz bandpass)</span>
      </label>

      <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
        <input
          type="checkbox"
          checked={options.normalizeSignal}
          onChange={() =>
            onOptionChange &&
            onOptionChange({
              ...options,
              normalizeSignal: !options.normalizeSignal,
            })
          }
          className="mr-2 h-5 w-5 text-primary border-gray-400 rounded"
        />
        <span className="text-base">Normalize signal amplitudes</span>
      </label>

      <label className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200">
        <input
          type="checkbox"
          checked={options.removeOcular}
          onChange={() =>
            onOptionChange &&
            onOptionChange({
              ...options,
              removeOcular: !options.removeOcular,
            })
          }
          className="mr-2 h-5 w-5 text-primary border-gray-400 rounded"
        />
        <span className="text-base">Remove ocular artifacts</span>
      </label>
    </div>
  </div>
);

export default PreprocessingOptions;
