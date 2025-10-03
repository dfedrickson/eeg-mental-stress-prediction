import React from "react";

const ChannelSelector = ({
  selectedChannels = ["Fp1", "Fp2", "C3", "C4", "T5", "T6", "O1", "O2"],
  onChannelChange,
}) => {
  const toggleChannel = (channel) => {
    if (onChannelChange) {
      const newChannels = selectedChannels.includes(channel)
        ? selectedChannels.filter((c) => c !== channel)
        : [...selectedChannels, channel];
      onChannelChange(newChannels);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">

      {/* Heading */}
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        2. Select Channels
      </h3>

      {/* Instruction */}
      <p className="text-sm text-gray-600 dark:text-gray-400 text-sm mb-3">
        Choose the EEG channels to include in the analysis (8-channel preset).
      </p>

      {/* Channel checkboxes */}
      <div className="grid grid-cols-2 gap-3">
        {["Fp1", "Fp2", "C3", "C4", "T5", "T6", "O1", "O2"].map((channel) => (
          <label
            key={channel}
            className="flex items-center cursor-pointer text-gray-800 dark:text-gray-200"
          >
            <input
              type="checkbox"
              checked={selectedChannels.includes(channel)}
              onChange={() => toggleChannel(channel)}
              className="mr-2 h-5 w-5 text-primary border-gray-400 rounded"
            />
            <span className="text-base">{channel}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ChannelSelector;
