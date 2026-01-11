import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const Graph = () => {
  // Keeping state for potential prop-driven theme in future, defaults to light
  const [isDarkMode] = useState(false);

  // Mock Data: Revenue by Chapter
  const data = [
    { name: 'New York', revenue: 450000, growth: 12 },
    { name: 'London', revenue: 380000, growth: 8 },
    { name: 'Tokyo', revenue: 320000, growth: -2 },
    { name: 'Dubai', revenue: 290000, growth: 15 },
    { name: 'Paris', revenue: 270000, growth: 5 },
    { name: 'Berlin', revenue: 250000, growth: 4 },
    { name: 'Singapore', revenue: 230000, growth: 9 },
    { name: 'Sydney', revenue: 210000, growth: 3 },
    { name: 'Toronto', revenue: 190000, growth: 6 },
    { name: 'Mumbai', revenue: 180000, growth: 20 },
    { name: 'Sao Paulo', revenue: 160000, growth: 11 },
    { name: 'Mexico City', revenue: 150000, growth: 7 },
    { name: 'Los Angeles', revenue: 140000, growth: 5 },
    { name: 'Chicago', revenue: 130000, growth: -1 },
    { name: 'Hong Kong', revenue: 120000, growth: 4 },
    { name: 'Shanghai', revenue: 110000, growth: 10 },
  ];

  // Dynamic width calculation (min 100% or based on data length)
  const chartWidth = Math.max(data.length * 70, 600);

  // Formatting helpers
  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-xl text-sm transition-colors duration-200">
          <p className="font-bold text-gray-900 dark:text-white mb-2 text-base">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500 dark:text-gray-400">Revenue:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">
                {formatCurrency(item.revenue)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-500 dark:text-gray-400">Growth:</span>
              <span className={`font-medium ${item.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.growth > 0 ? '+' : ''}{item.growth}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen p-4 flex items-start justify-center transition-colors duration-300 `}>
      
      {/* Container Constraint: 
        w-full lg:w-1/2 sets it to half width on large screens.
        max-w-3xl prevents it from getting too wide on huge screens.
      */}
      <div className="w-full lg:w-1/2 max-w-4xl animate-fade-in-up">
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
          
          {/* Header Section */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Revenue by Chapter</h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Global performance across key regions
                </p>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/50">
            <div className="w-full overflow-x-auto pb-2 custom-scrollbar">
              <div style={{ width: `${chartWidth}px`, height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                    barSize={32}
                  >
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.4}/>
                      </linearGradient>
                      <linearGradient id="colorRevenueDark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34D399" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#34D399" stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      vertical={false} 
                      stroke={isDarkMode ? "#374151" : "#E5E7EB"} 
                    />
                    
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280", fontSize: 11, fontWeight: 500 }}
                      interval={0}
                      dy={10}
                    />
                    
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: isDarkMode ? "#9CA3AF" : "#6B7280", fontSize: 11 }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    
                    <Tooltip 
                      content={<CustomTooltip />} 
                      cursor={{ fill: isDarkMode ? '#374151' : '#F3F4F6', opacity: 0.4 }} 
                    />
                    
                    <Bar 
                      dataKey="revenue" 
                      fill="url(#colorRevenue)" 
                      radius={[6, 6, 0, 0]}
                      animationDuration={1500}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={isDarkMode ? "url(#colorRevenueDark)" : "url(#colorRevenue)"} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Styles for the component */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #CBD5E1;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #94A3B8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4B5563;
        }
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Graph;