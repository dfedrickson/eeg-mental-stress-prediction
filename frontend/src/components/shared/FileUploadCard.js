import React, { useState, useRef } from "react";
import { FiUpload } from "react-icons/fi";

export default function FileUploadCard({
  selectedChannels,
  preprocessingOptions,
  setPrediction,
  setFeatures,
  setExplanation,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleUpload = async () => {
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
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      {/* Title + Instructions */}
      <h1 className="text-xl font-bold">1. Upload File</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Select the EEG data file from your computer (.edf, .bdf, .gdf supported).
      </p>

      {/* Upload Box */}
      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-8 h-48 cursor-pointer hover:border-blue-500 transition"
        onClick={handleUploadClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FiUpload size={48} className="text-gray-400 mb-2" />
        {file ? (
          <p className="text-gray-700 dark:text-gray-200 truncate">{file.name}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Drag & drop your EEG file here, or click to browse
          </p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
