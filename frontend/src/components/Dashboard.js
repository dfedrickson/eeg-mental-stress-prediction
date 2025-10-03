import React from "react";
import PlaceholderChart from "./shared/PlaceholderChart";

const Dashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>

    {/* 3-card grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Recent Analysis */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Recent Analysis</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Last Session</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Low Stress
            </span>
          </div>
          <div className="flex justify-between">
            <span>Today</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Medium Stress
            </span>
          </div>
        </div>
      </div>

      {/* Data Quality */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Data Quality</h3>
        <div className="text-center">
          <div className="text-2xl font-bold">92%</div>
          <div className="text-sm text-muted-foreground">
            Signal Quality Score
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
        <button className="w-full mb-2 py-2 px-3 bg-secondary rounded-md text-sm">
          New Analysis
        </button>
        <button className="w-full py-2 px-3 bg-secondary rounded-md text-sm">
          View History
        </button>
      </div>
    </div>

    {/* Chart */}
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Weekly Stress Pattern</h3>
      <PlaceholderChart />
    </div>
  </div>
);

export default Dashboard;
