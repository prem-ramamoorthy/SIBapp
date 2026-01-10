import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Search, Filter, Moon, Sun } from 'lucide-react';

const StatTable = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data representing a breakdown of the stats by Chapter
const tableData = [
    {
        id: 1,
        chapterName: "New York Chapter",
        members: 950,
        referrals: "4,320",
        revenue: "$15.2M",
        MtoM: "345",
        trend: 12.5,
    },
    {
        id: 2,
        chapterName: "London Chapter",
        members: 640,
        referrals: "3,105",
        revenue: "$10.8M",
        MtoM: "87",
        trend: 8.2,
    },
    {
        id: 3,
        chapterName: "Tokyo Chapter",
        members: 580,
        referrals: "2,800",
        revenue: "$9.1M",
        MtoM: "2345",
        trend: -2.4,
    },
    {
        id: 4,
        chapterName: "Sao Paulo Chapter",
        members: 320,
        referrals: "1,200",
        revenue: "$4.5M",
        MtoM: "78",
        trend: 5.7,
    },
    {
        id: 5,
        chapterName: "Dubai Chapter",
        members: 245,
        referrals: "890",
        revenue: "$3.2M",
        MtoM: "89",
        trend: 1.1,
    },
    {
        id: 6,
        chapterName: "Stockholm Chapter",
        members: 110,
        referrals: "228",
        revenue: "$2.4M",
        MtoM: "98",
        trend: 3.8,
    },
];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="w-full min-h-screen p-6 transition-colors duration-200">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chapter Performance</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overview of members and revenue by chapter.</p>
          </div>
          <div className="flex items-center gap-3">
          </div>
        </div>

        {/* Table Container */}
        <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200">
          
          {/* Table Controls */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search chapters..." 
                className="pl-10 pr-4 py-2 w-full sm:w-64 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Chapter Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Total Members</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Referrals</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">Revenue</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white">M to M</th>
                  <th className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-right">Trend</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {row.chapterName}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {row.members}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                      {row.referrals}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {row.revenue}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                    {row.MtoM}

                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`flex items-center justify-end gap-1 ${row.trend >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {row.trend >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        <span className="font-medium">{Math.abs(row.trend)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">Showing 1-6 of 24 chapters</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">Previous</button>
              <button className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatTable;