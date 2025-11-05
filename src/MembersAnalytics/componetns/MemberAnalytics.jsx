import React, { useState, useMemo } from 'react'

const DUMMY_DATA = [
    {
        id: 1,
        rank: 1,
        name: 'Deepak',
        company: 'Trading House',
        referralsGiven: 145,
        referralsReceived: 32,
        tyftbGiven: 89,
        tyftbReceived: 45,
        businessMade: '₹8.9cr',
        businessGiven: '₹7.2cr',
        mToM: 156,
        visitorsBrought: 28,
    },
    {
        id: 2,
        rank: 2,
        name: 'Gnanavel',
        company: 'Export Services',
        referralsGiven: 128,
        referralsReceived: 48,
        tyftbGiven: 76,
        tyftbReceived: 52,
        businessMade: '₹7.8cr',
        businessGiven: '₹6.4cr',
        mToM: 142,
        visitorsBrought: 35,
    },
    {
        id: 3,
        rank: 3,
        name: 'Sedhu',
        company: 'Consulting Firm',
        referralsGiven: 115,
        referralsReceived: 38,
        tyftbGiven: 68,
        tyftbReceived: 42,
        businessMade: '₹6.9cr',
        businessGiven: '₹5.8cr',
        mToM: 128,
        visitorsBrought: 22,
    },
    {
        id: 4,
        rank: 4,
        name: 'Balaji UPVC',
        company: 'UPVC Solutions',
        referralsGiven: 98,
        referralsReceived: 67,
        tyftbGiven: 52,
        tyftbReceived: 68,
        businessMade: '₹6.2cr',
        businessGiven: '₹5.1cr',
        mToM: 134,
        visitorsBrought: 41,
    },
    {
        id: 5,
        rank: 5,
        name: 'Madhu',
        company: 'Services',
        referralsGiven: 92,
        referralsReceived: 45,
        tyftbGiven: 48,
        tyftbReceived: 38,
        businessMade: '₹5.8cr',
        businessGiven: '₹4.9cr',
        mToM: 118,
        visitorsBrought: 18,
    },
    {
        id: 6,
        rank: 6,
        name: 'Sathishkumar',
        company: 'Education Services',
        referralsGiven: 108,
        referralsReceived: 52,
        tyftbGiven: 72,
        tyftbReceived: 58,
        businessMade: '₹7.1cr',
        businessGiven: '₹5.9cr',
        mToM: 145,
        visitorsBrought: 32,
    },
]

const TOTAL_ROW = {
    rank: null,
    name: 'TOTAL',
    company: '(All Members)',
    referralsGiven: 2847,
    referralsReceived: 1256,
    tyftbGiven: 1834,
    tyftbReceived: 1445,
    businessMade: '₹156.8cr',
    businessGiven: '₹128.4cr',
    mToM: 3648,
    visitorsBrought: 892,
}

const TABLE_COLUMNS = [
    { key: 'rank', label: 'RANK', sortable: true, width: 'w-12' },
    { key: 'name', label: 'MEMBER NAME', sortable: true, width: 'flex-1 min-w-[120px]' },
    { key: 'company', label: 'COMPANY', sortable: true, width: 'flex-1 min-w-[140px]' },
    { key: 'referralsGiven', label: 'REFERRALS GIVEN', sortable: true, width: 'w-24' },
    { key: 'referralsReceived', label: 'REFERRALS RECEIVED', sortable: true, width: 'w-24' },
    { key: 'tyftbGiven', label: 'TYFB GIVEN', sortable: true, width: 'w-20' },
    { key: 'tyftbReceived', label: 'TYFB RECEIVED', sortable: true, width: 'w-20' },
    { key: 'businessMade', label: 'BUSINESS MADE', sortable: true, width: 'w-24' },
    { key: 'businessGiven', label: 'BUSINESS GIVEN', sortable: true, width: 'w-24' },
    { key: 'mToM', label: 'M TO M', sortable: true, width: 'w-16' },
    { key: 'visitorsBrought', label: 'VISITORS BROUGHT', sortable: true, width: 'w-20' },
]

const MemberDetailedAnalyticsReport = () => {
    const [data, setData] = useState(DUMMY_DATA)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' })
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [visibleColumns, setVisibleColumns] = useState(
        TABLE_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
    )

    const filteredData = useMemo(() => {
        return data.filter(row =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.company.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [data, searchTerm])

    const sortedData = useMemo(() => {
        const sorted = [...filteredData].sort((a, b) => {
            const aValue = a[sortConfig.key]
            const bValue = b[sortConfig.key]

            if (aValue === null || aValue === undefined) return 1
            if (bValue === null || bValue === undefined) return -1

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue)
            }

            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
        })

        return sorted
    }, [filteredData, sortConfig])

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return sortedData.slice(startIndex, startIndex + itemsPerPage)
    }, [sortedData, currentPage, itemsPerPage])

    const totalPages = Math.ceil(sortedData.length / itemsPerPage)

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
        }))
        setCurrentPage(1)
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const handleExport = () => {
        try {
            const csvHeader = TABLE_COLUMNS.map(col => col.label).join(',')
            const csvRows = sortedData.map(row =>
                TABLE_COLUMNS.map(col => {
                    const value = row[col.key]
                    return typeof value === 'string' ? `"${value}"` : value
                }).join(',')
            )
            const csv = [csvHeader, ...csvRows].join('\n')

            const blob = new Blob([csv], { type: 'text/csv' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'member_analytics_report.csv'
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (err) {
            console.log(err)
            setError('Failed to export data')
        }
    }

    const toggleColumn = (key) => {
        setVisibleColumns(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                        Member Detailed Analytics Report
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Track and analyze member performance metrics and referral data
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search member or company..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="
                  w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                  placeholder-gray-500 dark:placeholder-gray-400
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200 text-sm
                "
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase">
                                Rows per page
                            </label>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value))
                                    setCurrentPage(1)
                                }}
                                className="
                  w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  transition-all duration-200 text-sm
                "
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={handleExport}
                                disabled={loading}
                                className="
                  w-full px-4 py-2 rounded-lg font-medium text-sm
                  bg-amber-300 hover:bg-amber-400
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                  dark:bg-amber-400 dark:hover:bg-amber-500
                  dark : text-black
                "
                            >
                                📥 Export CSV
                            </button>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={() => {
                                    setLoading(true)
                                    setTimeout(() => {
                                        setLoading(false)
                                        setCurrentPage(1)
                                    }, 500)
                                }}
                                disabled={loading}
                                className="
                  w-full px-4 py-2 rounded-lg font-medium text-sm
                  bg-gray-500 hover:bg-gray-600 text-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                  dark:bg-gray-600 dark:hover:bg-gray-700
                "
                            >
                                {loading ? '⟳ Refreshing...' : '⟳ Refresh'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Total Members</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{sortedData.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Total Referrals</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{TOTAL_ROW.referralsGiven}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Business Made</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{TOTAL_ROW.businessMade}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Visitors Brought</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{TOTAL_ROW.visitorsBrought}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-b border-gray-300 dark:border-gray-600">
                        <details className="cursor-pointer">
                            <summary className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase hover:text-gray-900 dark:hover:text-gray-100">
                                ⚙️ Column Visibility
                            </summary>
                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ">
                                {TABLE_COLUMNS.map(col => (
                                    <label key={col.key} className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns[col.key]}
                                            onChange={() => toggleColumn(col.key)}
                                            className="rounded"
                                        />
                                        <span className="text-gray-700 dark:text-gray-300">{col.label}</span>
                                    </label>
                                ))}
                            </div>
                        </details>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-800 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
                                    {TABLE_COLUMNS.map(col => {
                                        if (!visibleColumns[col.key]) return null
                                        return (
                                            <th
                                                key={col.key}
                                                onClick={() => col.sortable && handleSort(col.key)}
                                                className={`
                          px-3 sm:px-4 py-3 text-left text-xs font-bold text-white
                          uppercase tracking-wide
                          ${col.sortable ? 'cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-800' : ''}
                          transition-colors duration-200
                          ${col.width}
                        `}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span>{col.label}</span>
                                                    {col.sortable && (
                                                        <span className="text-xs">
                                                            {sortConfig.key === col.key
                                                                ? sortConfig.direction === 'asc'
                                                                    ? '↑'
                                                                    : '↓'
                                                                : '↕'}
                                                        </span>
                                                    )}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((row, idx) => (
                                        <tr
                                            key={row.id}
                                            className={`
                        border-b border-gray-200 dark:border-gray-700
                        ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}
                        hover:bg-gray-100 dark:hover:bg-gray-900/50
                        transition-colors duration-200
                      `}
                                        >
                                            {TABLE_COLUMNS.map(col => {
                                                if (!visibleColumns[col.key]) return null
                                                const value = row[col.key]
                                                return (
                                                    <td
                                                        key={col.key}
                                                        className={`
                              px-3 sm:px-4 py-3 text-xs sm:text-sm
                              text-gray-900 dark:text-gray-50
                              font-medium
                              ${col.width}
                            `}
                                                    >
                                                        {col.key === 'rank' && value ? (
                                                            <span className={`
                                inline-flex items-center justify-center w-6 h-6 rounded-full font-bold
                                ${value === 1 ? 'bg-yellow-300 text-yellow-900' :
                                                                    value === 2 ? 'bg-gray-300 text-gray-900' :
                                                                        value === 3 ? 'bg-orange-300 text-orange-900' :
                                                                            'bg-gray-500 text-gray-900'}
                              `}>
                                                                {value}
                                                            </span>
                                                        ) : (
                                                            value
                                                        )}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={TABLE_COLUMNS.filter(c => visibleColumns[c.key]).length}
                                            className="px-4 py-8 text-center text-gray-600 dark:text-gray-400"
                                        >
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto border-t-2 border-gray-300 dark:border-gray-600">
                        <table className="w-full">
                            <tbody>
                                <tr className="bg-gray-100 dark:bg-gray-900">
                                    {TABLE_COLUMNS.map(col => {
                                        if (!visibleColumns[col.key]) return null
                                        return (
                                            <td
                                                key={col.key}
                                                className={`
                          px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold
                          text-gray-900 dark:text-gray-50
                          ${col.width}
                        `}
                                            >
                                                {TOTAL_ROW[col.key]}
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-semibold">{Math.min(currentPage * itemsPerPage, sortedData.length)}</span> of{' '}
                        <span className="font-semibold">{sortedData.length}</span> results
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="
                px-3 py-2 rounded-lg text-sm font-medium
                bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                border border-gray-300 dark:border-gray-600
                hover:bg-gray-200 dark:hover:bg-gray-600
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
              "
                        >
                            ← Previous
                        </button>

                        <div className="flex gap-1 items-center">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum
                                if (totalPages <= 5) {
                                    pageNum = i + 1
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i
                                } else {
                                    pageNum = currentPage - 2 + i
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`
                      px-3 py-2 rounded text-sm font-medium transition-colors duration-200
                      ${currentPage === pageNum
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }
                    `}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="
                px-3 py-2 rounded-lg text-sm font-medium
                bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                border border-gray-300 dark:border-gray-600
                hover:bg-gray-200 dark:hover:bg-gray-600
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
              "
                        >
                            Next →
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
                    <p>Last updated: {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default MemberDetailedAnalyticsReport