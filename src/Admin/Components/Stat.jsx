const Stats = () => {
    // Data configuration
    const statsData = [
        {
            id: 1,
            label: "Referrals Passed",
            value: "12,543",
            trend: "+15% from last month",
            trendColor: "text-emerald-600 dark:text-emerald-600"
        },
        {
            id: 2,
            label: "Total Members",
            value: "2,845",
            trend: "+5% from last month",
            trendColor: "text-emerald-600 dark:text-emerald-600"
        },
        {
            id: 3,
            label: "Total Revenue",
            value: "$45.2M",
            trend: "+12% from last month",
            trendColor: "text-emerald-600 dark:text-emerald-600"
        },
        {
            id: 4,
            label: "Chapter Count",
            value: "142",
            trend: "No change",
            trendColor: "text-gray-500 dark:text-gray-500"
        },
        {
            id: 5,
            label: "Total Regions",
            value: "24",
            trend: "+2 new regions",
            trendColor: "text-emerald-600 dark:text-emerald-600"
        },
    ];

    return (
        <div className="w-full p-6 flex items-start justify-center">
            {/* Main Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full max-w-7xl">
                {statsData.map((stat) => (
                    <div
                        key={stat.id}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between"
                    >
                        <div>
                            {/* Label */}
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                {stat.label}
                            </p>
                            
                            {/* Main Value */}
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                                {stat.value}
                            </h3>
                        </div>

                        {/* Bottom Text / Trend */}
                        <div className={`mt-4 text-xs font-medium ${stat.trendColor}`}>
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
