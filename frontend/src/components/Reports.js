import React from "react";
import ReportCard from "./shared/ReportCard";
import PlaceholderChart from "./shared/PlaceholderChart";

const Reports = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Reports & Analytics</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ReportCard />
      <ReportCard />
    </div>
    <PlaceholderChart title="Stress Trends Over Time" height={400} />
  </div>
);

export default Reports;
