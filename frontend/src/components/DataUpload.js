import React, { useState } from "react";
import FileUploadCard from "./shared/FileUploadCard";
import ChannelSelector from "./shared/ChannelSelector";
import PreprocessingOptions from "./shared/PreprocessingOptions";
import { FiUpload } from "react-icons/fi";

const DataUpload = ({ setPrediction, setFeatures, setExplanation }) => {
  const [file, setFile] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([
    "Fp1", "Fp2", "C3", "C4", "T5", "T6", "O1", "O2"
  ]);
  const [preprocessingOptions, setPreprocessingOptions] = useState({
    filterArtifacts: true,
    normalizeSignal: true,
    removeOcular: false,
  });
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("channels", JSON.stringify(selectedChannels));
    formData.append("preprocessing", JSON.stringify(preprocessingOptions));

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setPrediction(data.level);
      setFeatures(data.features);
      setExplanation(data.explanation);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Data Upload</h2>

      {/* File Upload */}
      <FileUploadCard file={file} setFile={setFile} />

      {/* Channel Selector */}
      <ChannelSelector
        selectedChannels={selectedChannels}
        onChannelChange={setSelectedChannels}
      />

      {/* Preprocessing Options */}
      <PreprocessingOptions
        options={preprocessingOptions}
        onOptionChange={setPreprocessingOptions}
      />

      {/* Single Button */}
      <div className="flex justify-end">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleAnalyze}
          disabled={loading || !file}
        >
          <FiUpload size={20} className="text-white" />
          <span>{loading ? "Processing..." : "Upload & Analyze"}</span>
        </button>
      </div>
    </div>
  );
};

export default DataUpload;
