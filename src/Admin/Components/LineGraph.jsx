import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar } from 'lucide-react';

const LineGraph = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock Data: Monthly trends for Referrals, TYB (Total Yield Business), and Members
  const data = [
    { name: 'Jan', referrals: 4000, tyb: 2400, members: 2400 },
    { name: 'Feb', referrals: 3000, tyb: 1398, members: 2210 },
    { name: 'Mar', referrals: 2000, tyb: 9800, members: 2290 },
    { name: 'Apr', referrals: 2780, tyb: 3908, members: 2000 },
    { name: 'May', referrals: 1890, tyb: 4800, members: 2181 },
    { name: 'Jun', referrals: 2390, tyb: 3800, members: 2500 },
    { name: 'Jul', referrals: 3490, tyb: 4300, members: 2100 },
    { name: 'Aug', referrals: 4200, tyb: 5100, members: 2300 },
    { name: 'Sep', referrals: 3800, tyb: 4600, members: 2400 },
    { name: 'Oct', referrals: 4500, tyb: 5400, members: 2600 },
    { name: 'Nov', referrals: 4100, tyb: 4900, members: 2750 },
    { name: 'Dec', referrals: 4800, tyb: 6000, members: 2900 },
  ];

  // Custom Tooltip for professional look
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-lg rounded-lg text-sm">
          <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 dark:text-gray-300 capitalize">
                {entry.name}:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {entry.name === 'tyb' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={'w-1/2'+isDarkMode ? 'dark' : ''}>
      {/* Main Container: 
          - lg:w-1/2 restricts width to 50% on desktop screens.
          - w-full ensures it takes full width on mobile.
      */}
      <div className="w-full p-6 transition-colors duration-200">
        
        {/* Chart Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Monthly Trends</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Referrals vs TYB vs MtoM
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
               <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Calendar className="w-4 h-4" />
                12 Months
              </button>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
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
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280", fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                
                {/* Referrals Line (Blue) */}
                <Line
                  type="monotone"
                  dataKey="referrals"
                  name="Referrals"
                  stroke="#2563EB" // Blue-600
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />

                {/* TYB Line (Green/Emerald) */}
                <Line
                  type="monotone"
                  dataKey="tyb"
                  name="TYB"
                  stroke="#10B981" // Emerald-500
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />

                {/* Members Line (Amber/Orange) */}
                <Line
                  type="monotone"
                  dataKey="members"
                  name="Members"
                  stroke="#F59E0B" // Amber-500
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LineGraph;