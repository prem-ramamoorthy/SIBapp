import { useState, useMemo, useEffect } from 'react'

const TABLE_COLUMNS = [
    { key: 'rank', label: 'RANK', sortable: true, width: 'w-12' },
    { key: 'name', label: 'MEMBER NAME', sortable: true, width: 'flex-1 min-w-[120px]' },
    { key: 'referralsGiven', label: 'REFERRALS GIVEN', sortable: true, width: 'w-24' },
    { key: 'referralsReceived', label: 'REFERRALS RECEIVED', sortable: true, width: 'w-24' },
    { key: 'tyftbGiven', label: 'TYFB GIVEN', sortable: true, width: 'w-20' },
    { key: 'tyftbReceived', label: 'TYFB RECEIVED', sortable: true, width: 'w-20' },
    { key: 'businessMade', label: 'BUSINESS MADE', sortable: true, width: 'w-24' },
    { key: 'businessGiven', label: 'BUSINESS GIVEN', sortable: true, width: 'w-24' },
    { key: 'mToM', label: 'M TO M', sortable: true, width: 'w-16' },
    { key: 'visitorsBrought', label: 'VISITORS BROUGHT', sortable: true, width: 'w-20' },
]

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 25, 50]

function parseNumber(value) {
    if (typeof value === 'number') return value
    if (typeof value !== 'string') return 0
    if (value.includes('₹') && value.includes('cr')) {
        return parseFloat(value.replace(/[₹,cr\s]/g, ''))
    }
    if (value.includes('₹') && value.includes('L')) {
        return parseFloat(value.replace(/[₹,L\s]/g, ''))
    }
    return parseFloat(value.replace(/[₹,]/g, '')) || 0
}

function formatToCr(val) {
    let n = parseNumber(val)
    if (isNaN(n) || n === 0) return "₹0"
    return `₹${(n)}`
}

function getTotalRow(data, visibleColumns) {
    const totals = {
        rank: null,
        name: 'TOTAL',
        referralsGiven: 0,
        referralsReceived: 0,
        tyftbGiven: 0,
        tyftbReceived: 0,
        businessMade: 0,
        businessGiven: 0,
        mToM: 0,
        visitorsBrought: 0,
    }
    data.forEach(row => {
        Object.keys(totals).forEach(key => {
            if (key === 'name' || key === 'rank') return
            totals[key] += parseNumber(row[key])
        })
    })
    let result = {}
    TABLE_COLUMNS.forEach(col => {
        if (!visibleColumns[col.key]) return
        if (col.key === 'rank') result[col.key] = ''
        else if (col.key === 'name') result[col.key] = 'TOTAL'
        else if (col.key === 'businessMade' || col.key === 'businessGiven')
            result[col.key] = formatToCr(totals[col.key])
        else
            result[col.key] = totals[col.key]
    })
    return result
}

const getSortValue = (value, columnKey) => {
    if (columnKey === 'businessMade' || columnKey === 'businessGiven')
        return parseNumber(value)
    if (typeof value === 'string') return value.toLowerCase()
    return value
}

const MemberDetailedAnalyticsReport = () => {
    const [members, setMembers] = useState([])
    const [timePeriod, setTimePeriod] = useState('lifetime')
    const [searchTerm, setSearchTerm] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [visibleColumns, setVisibleColumns] = useState(
        TABLE_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
    )
    const [sortConfig, setSortConfig] = useState({
        key: 'rank',
        direction: 'asc'
    })

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/activity/getactivityofusers`, {
                    credentials: 'include'
                })
                if (!response.ok) throw new Error(`Error: ${response.status}`)
                let data = await response.json()
                data = data.map((item, i) => ({
                    ...item,
                    rank: i + 1,
                    businessMade: formatToCr(item.businessMade),
                    businessGiven: formatToCr(item.businessGiven)
                }))
                setMembers(data)
            } catch (err) {
                setError('Unable to load analytics: ' + err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const filteredAndSortedData = useMemo(() => {
        let result = members.filter(row =>
            row.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        result = [...result].sort((a, b) => {
            const aValue = getSortValue(a[sortConfig.key], sortConfig.key)
            const bValue = getSortValue(b[sortConfig.key], sortConfig.key)
            let comparison = 0
            if (aValue < bValue) comparison = -1
            else if (aValue > bValue) comparison = 1
            return sortConfig.direction === 'asc' ? comparison : -comparison
        })
        return result
    }, [members, searchTerm, sortConfig])

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredAndSortedData, currentPage, itemsPerPage])

    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
    const TOTAL_ROW = getTotalRow(filteredAndSortedData, visibleColumns)

    const handleTimePeriod = (period) => {
        setTimePeriod(period)
        setCurrentPage(1)
    }
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }
    const handleSort = (columnKey) => {
        setSortConfig(prev => ({
            key: columnKey,
            direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
        setCurrentPage(1)
    }
    const handleExport = () => {
        setLoading(true)
        try {
            const csvHeader = TABLE_COLUMNS.filter(col => visibleColumns[col.key]).map(col => col.label).join(',')
            const csvRows = filteredAndSortedData.map(row =>
                TABLE_COLUMNS.filter(col => visibleColumns[col.key]).map(col => {
                    const value = row[col.key]
                    return typeof value === 'string' ? `"${value}"` : value
                }).join(',')
            )
            const csv = [csvHeader, ...csvRows].join('\n')
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', `member_analytics_${new Date().toISOString().split('T')[0]}.csv`)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            setSuccess('Data exported successfully')
            setTimeout(() => setSuccess(null), 2000)
        } catch (err) {
            setError('Export failed')
        } finally {
            setLoading(false)
        }
    }
    const toggleColumn = (key) => {
        setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }))
    }
    const handleRefresh = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/activity/getactivityofusers`, {
                credentials: 'include'
            })
            if (!response.ok) throw new Error(`Error: ${response.status}`)
            let data = await response.json()
            data = data.map((item, i) => ({
                ...item,
                rank: i + 1,
                businessMade: formatToCr(item.businessMade),
                businessGiven: formatToCr(item.businessGiven)
            }))
            setMembers(data)
            setSuccess('Data refreshed successfully')
            setTimeout(() => setSuccess(null), 2000)
        } catch (err) {
            setError('Unable to refresh: ' + err.message)
        } finally {
            setLoading(false)
        }
    }
    const TIME_PERIOD_OPTIONS = [
        { value: 'lifetime', label: 'Lifetime' },
        { value: 'last6months', label: 'Last 6 Months' },
        { value: 'lastmonth', label: 'Last Month' },
        { value: 'lastweek', label: 'Last Week' },
    ]

    return (
        <div className="min-w-full min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300">
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
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                        <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                    </div>
                )}
                {success &&
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
                    </div>
                }
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
                                    Time Period
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {TIME_PERIOD_OPTIONS.map(option => (
                                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="timePeriod"
                                                value={option.value}
                                                checked={timePeriod === option.value}
                                                onChange={() => handleTimePeriod(option.value)}
                                                className="w-4 h-4 accent-blue-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase">
                                    Search Member
                                </label>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Type to search..."
                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-end items-start sm:items-end">
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <button
                                    onClick={handleExport}
                                    disabled={loading}
                                    className="flex-1 sm:flex-initial px-6 py-2 rounded-lg font-bold text-sm bg-yellow-400 hover:bg-yellow-500 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Export
                                </button>
                                <button
                                    onClick={handleRefresh}
                                    disabled={loading}
                                    className="flex-1 sm:flex-initial px-6 py-2 rounded-lg font-semibold text-sm bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {loading ? '⟳ Refreshing' : '⟳ Refresh'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 border-b border-gray-300 dark:border-gray-600">
                        <details className="cursor-pointer">
                            <summary className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase hover:text-gray-900 dark:hover:text-gray-100 select-none">
                                ⚙️ Column Visibility
                            </summary>
                            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {TABLE_COLUMNS.map(col => (
                                    <label key={col.key} className="flex items-center gap-2 cursor-pointer text-sm">
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns[col.key]}
                                            onChange={() => toggleColumn(col.key)}
                                            className="rounded accent-blue-500"
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
                                                className={`px-3 sm:px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wide ${col.width} ${col.sortable ? 'cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-800' : ''} transition-colors`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span>{col.label}</span>
                                                    {col.sortable && (
                                                        <span className="text-xs">
                                                            {sortConfig.key === col.key ? (
                                                                sortConfig.direction === 'asc' ? '↑' : '↓'
                                                            ) : (
                                                                '⇅'
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={TABLE_COLUMNS.filter(c => visibleColumns[c.key]).length} className="py-8 text-center">Loading...</td></tr>
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((row, idx) => (
                                        <tr
                                            key={row.id}
                                            className={`border-b border-gray-200 dark:border-gray-700 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors duration-200`}
                                        >
                                            {TABLE_COLUMNS.map(col => {
                                                if (!visibleColumns[col.key]) return null
                                                const value = row[col.key]
                                                return (
                                                    <td
                                                        key={col.key}
                                                        className={`px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium ${col.width}`}
                                                    >
                                                        {col.key === 'rank' && value ? (
                                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold ${value === 1 ? 'bg-yellow-300 text-yellow-900' : value === 2 ? 'bg-gray-300 text-gray-900' : value === 3 ? 'bg-orange-300 text-orange-900' : 'bg-gray-500 text-white'}`}>
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
                                        <td colSpan={TABLE_COLUMNS.filter(c => visibleColumns[c.key]).length} className="px-4 py-8 text-center text-gray-600 dark:text-gray-400">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                                <tr className="bg-gray-100 dark:bg-gray-900">
                                    {TABLE_COLUMNS.map(col => {
                                        if (!visibleColumns[col.key]) return null
                                        return (
                                            <td key={col.key} className={`px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50 ${col.width}`}>
                                                {TOTAL_ROW[col.key]}
                                            </td>
                                        )
                                    })}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                        <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span> of{' '}
                        <span className="font-semibold">{filteredAndSortedData.length}</span> results
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500"
                        >
                            {ITEMS_PER_PAGE_OPTIONS.map(option => (
                                <option key={option} value={option}>{option} per page</option>
                            ))}
                        </select>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                ← Previous
                            </button>
                            <div className="flex gap-1 items-center">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum
                                    if (totalPages <= 5) pageNum = i + 1
                                    else if (currentPage <= 3) pageNum = i + 1
                                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i
                                    else pageNum = currentPage - 2 + i
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${currentPage === pageNum ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                })}
                            </div>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberDetailedAnalyticsReport
