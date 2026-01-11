import React, { useState, useMemo } from 'react';
import { 
    Search, 
    ChevronDown, 
    ChevronUp, 
    ArrowUpDown 
} from 'lucide-react';

// Utility: Auto-format numbers to Indian System (k, L, Cr)
const formatIndianNumber = (num, isCurrency = false) => {
    if (!num && num !== 0) return "0";

    // Ensure we are working with a pure number
    const cleanNum = Number(String(num).replace(/,/g, '').replace(/[^0-9.]/g, ''));

    let formattedValue = "";
    let suffix = "";

    if (cleanNum >= 10000000) {
        formattedValue = (cleanNum / 10000000).toFixed(2); // Crores
        suffix = "Cr";
    } else if (cleanNum >= 100000) {
        formattedValue = (cleanNum / 100000).toFixed(2); // Lakhs
        suffix = "L";
    } else if (cleanNum >= 1000) {
        formattedValue = (cleanNum / 1000).toFixed(1); // Thousands
        suffix = "k";
    } else {
        formattedValue = cleanNum;
    }

    // Clean up decimal places (e.g. "45.00" -> "45")
    formattedValue = String(formattedValue).replace(/\.00$/, '').replace(/\.0$/, '');

    const prefix = isCurrency ? "₹ " : "";
    return `${prefix}${formattedValue}${suffix}`;
};

const StatTable = () => {
    // --- Table State & Logic ---
    const [tableTimeRange, setTableTimeRange] = useState('ytd');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    // Mock Data for Table (Expanded for scrolling demonstration)
    const rawTableData = [
        { id: 1, chapter: "Alpha Innovators", region: "North Delhi", members: 45, mtom: 230, referrals: 1240, revenue: 4500000 },
        { id: 2, chapter: "Mumbai Titans", region: "Mumbai South", members: 62, mtom: 410, referrals: 2100, revenue: 12500000 },
        { id: 3, chapter: "Bangalore Techies", region: "Bangalore East", members: 38, mtom: 180, referrals: 890, revenue: 3200000 },
        { id: 4, chapter: "Chennai Connect", region: "Chennai Central", members: 55, mtom: 320, referrals: 1560, revenue: 5600000 },
        { id: 5, chapter: "Pune Pioneers", region: "Pune West", members: 28, mtom: 110, referrals: 450, revenue: 1200000 },
        { id: 6, chapter: "Hyderabad Hub", region: "Hyderabad North", members: 42, mtom: 215, referrals: 980, revenue: 3800000 },
        { id: 7, chapter: "Kolkata Royals", region: "Kolkata Central", members: 31, mtom: 150, referrals: 670, revenue: 2100000 },
        { id: 8, chapter: "Jaipur Jewels", region: "Rajasthan East", members: 24, mtom: 95, referrals: 320, revenue: 850000 },
        { id: 9, chapter: "Ahmedabad Aces", region: "Gujarat North", members: 48, mtom: 275, referrals: 1100, revenue: 4100000 },
        { id: 10, chapter: "Lucknow Legends", region: "UP Central", members: 22, mtom: 85, referrals: 290, revenue: 750000 },
        { id: 11, chapter: "Chandigarh Champs", region: "Punjab North", members: 35, mtom: 190, referrals: 780, revenue: 2800000 },
        { id: 12, chapter: "Indore Insights", region: "MP West", members: 29, mtom: 120, referrals: 540, revenue: 1500000 },
        { id: 13, chapter: "Surat Success", region: "Gujarat South", members: 52, mtom: 350, referrals: 1800, revenue: 8200000 },
        { id: 14, chapter: "Kochi Kings", region: "Kerala Central", members: 33, mtom: 165, referrals: 720, revenue: 2400000 },
        { id: 15, chapter: "Nagpur Network", region: "Maharashtra East", members: 26, mtom: 105, referrals: 410, revenue: 1100000 },
        { id: 16, chapter: "Coimbatore Corp", region: "Tamil Nadu West", members: 40, mtom: 240, referrals: 950, revenue: 3600000 },
        { id: 17, chapter: "Vizag Ventures", region: "Andhra East", members: 30, mtom: 140, referrals: 620, revenue: 1900000 },
        { id: 18, chapter: "Bhopal Business", region: "MP Central", members: 25, mtom: 100, referrals: 380, revenue: 950000 },
        { id: 19, chapter: "Vadodara Vision", region: "Gujarat Central", members: 36, mtom: 175, referrals: 810, revenue: 2900000 },
        { id: 20, chapter: "Goa Growth", region: "Goa Main", members: 20, mtom: 80, referrals: 250, revenue: 650000 },
    ];

    // Simulate data changes based on table time range
    const getAdjustedData = () => {
        const multipliers = { 'ytd': 1, '12m': 1.5, 'last_month': 0.1, 'last_week': 0.02 };
        const multiplier = multipliers[tableTimeRange] || 1;
        
        return rawTableData.map(row => ({
            ...row,
            mtom: Math.round(row.mtom * multiplier),
            referrals: Math.round(row.referrals * multiplier),
            revenue: Math.round(row.revenue * multiplier)
        }));
    };

    // Filter and Sort Logic
    const processedData = useMemo(() => {
        let data = getAdjustedData();

        // 1. Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            data = data.filter(item => 
                item.chapter.toLowerCase().includes(lowerTerm) || 
                item.region.toLowerCase().includes(lowerTerm)
            );
        }

        // 2. Sort
        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return data;
    }, [tableTimeRange, searchTerm, sortConfig]);

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return <ArrowUpDown size={14} className="text-gray-400" />;
        return sortConfig.direction === 'asc' 
            ? <ChevronUp size={14} className="text-emerald-600" /> 
            : <ChevronDown size={14} className="text-emerald-600" />;
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Table Header */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Chapter Performance</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Detailed breakdown by region and chapter</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Bar */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Chapter or Region..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
                        />
                    </div>

                    {/* Table Dropdown */}
                    <div className="relative">
                        <select
                            value={tableTimeRange}
                            onChange={(e) => setTableTimeRange(e.target.value)}
                            className="appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer hover:border-gray-300 transition-colors"
                        >
                            <option value="ytd">Year to Date</option>
                            <option value="12m">Last 12 Months</option>
                            <option value="last_month">Last Month</option>
                            <option value="last_week">Last Week</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-left border-collapse relative">
                    <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 shadow-sm">
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th 
                                className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => handleSort('chapter')}
                            >
                                <div className="flex items-center gap-2">Chapter {renderSortIcon('chapter')}</div>
                            </th>
                            <th 
                                className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => handleSort('region')}
                            >
                                <div className="flex items-center gap-2">Region {renderSortIcon('region')}</div>
                            </th>
                            <th 
                                className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right"
                                onClick={() => handleSort('members')}
                            >
                                <div className="flex items-center justify-end gap-2">Members {renderSortIcon('members')}</div>
                            </th>
                            <th 
                                className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right"
                                onClick={() => handleSort('mtom')}
                            >
                                <div className="flex items-center justify-end gap-2">M to M {renderSortIcon('mtom')}</div>
                            </th>
                            <th 
                                className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right"
                                onClick={() => handleSort('referrals')}
                            >
                                <div className="flex items-center justify-end gap-2">Referrals {renderSortIcon('referrals')}</div>
                            </th>
                            <th 
                                className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-right"
                                onClick={() => handleSort('revenue')}
                            >
                                <div className="flex items-center justify-end gap-2">Revenue {renderSortIcon('revenue')}</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {processedData.length > 0 ? (
                            processedData.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{row.chapter}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                            {row.region}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">{row.members}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm text-gray-600 dark:text-gray-300">
                                            {formatIndianNumber(row.mtom)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            {formatIndianNumber(row.referrals)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="text-sm font-bold text-emerald-600 dark:text-emerald-500">
                                            {formatIndianNumber(row.revenue, true)}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                    No chapters found matching "{searchTerm}"
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatTable;