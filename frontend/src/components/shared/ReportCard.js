import React from "react";

const ReportCard = ({ onViewReport, onDownloadPDF }) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
        <span className="text-xl">📊</span>
      </div>
      <div>
        <h3 className="text-lg font-medium">Session Report</h3>
        <p className="text-muted-foreground text-sm">Generated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
    <div className="flex justify-between mt-6">
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm" onClick={onViewReport}>
        View Report
      </button>
      <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm" onClick={onDownloadPDF}>
        Download PDF
      </button>
    </div>
  </div>
);

export default ReportCard;
