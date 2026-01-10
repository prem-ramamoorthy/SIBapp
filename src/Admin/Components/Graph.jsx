import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Moon, Sun, Download, Filter } from 'lucide-react';

const RevenueByChapterChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock Data: Revenue by Chapter
  // Added enough data points to demonstrate scrolling
  const data = [
    { name: 'New York', revenue: 450000 },
    { name: 'London', revenue: 380000 },
    { name: 'Tokyo', revenue: 320000 },
    { name: 'Dubai', revenue: 290000 },
    { name: 'Paris', revenue: 270000 },
    { name: 'Berlin', revenue: 250000 },
    { name: 'Singapore', revenue: 230000 },
    { name: 'Sydney', revenue: 210000 },
    { name: 'Toronto', revenue: 190000 },
    { name: 'Mumbai', revenue: 180000 },
    { name: 'Sao Paulo', revenue: 160000 },
    { name: 'Mexico City', revenue: 150000 },
    { name: 'Los Angeles', revenue: 140000 },
    { name: 'Chicago', revenue: 130000 },
    { name: 'Hong Kong', revenue: 120000 },
    { name: 'Shanghai', revenue: 110000 },
  ];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Calculate dynamic width based on number of items (approx 60px per bar)
  // Minimum width is 100% of container to prevent empty space for few items
  const chartWidth = Math.max(data.length * 80, 800);

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-lg text-sm">
          <p className="font-semibold text-gray-900 dark:text-white mb-1">{label}</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
            Revenue: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="w-full  p-6 transition-colors duration-200">
        
        {/* Chart Card */}
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue by Chapter</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Total revenue generated across different chapters.
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
            </div>
          </div>

          {/* Scrollable Container */}
          <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
            <div style={{ width: `${chartWidth}px`, height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={40}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke={isDarkMode ? "#374151" : "#E5E7EB"} 
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                    interval={0} // Force show all labels
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                  <Legend />
                  <Bar 
                    dataKey="revenue" 
                    name="Revenue" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
      
      {/* Custom Scrollbar Styles for this component */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4B5563;
        }
      `}</style>
    </div>
  );
};

export default RevenueByChapterChart;