import { useState, useMemo } from 'react'

const TABLE_COLUMNS = [
    { key: 'name', label: 'MEMBER NAME', sortable: true, width: 'flex-1 min-w-[150px]' },
    { key: 'attendance', label: 'CURRENT ATTENDANCE %', sortable: true, width: 'w-32' },
    { key: 'trend', label: 'TREND', sortable: false, width: 'w-16' },
    { key: 'lastPresent', label: 'LAST PRESENT DATE', sortable: true, width: 'w-32' },
    { key: 'contact', label: 'CONTACT INFORMATION', sortable: false, width: 'w-40' },
    { key: 'actions', label: 'ACTIONS', sortable: false, width: 'w-52' },
]

const ATTENDANCE_THRESHOLD = 75

const LowAttendanceAlert = ({ members = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        attendance: 72,
        trend: 'down',
        lastPresent: '26 Oct 2025',
        contact: '+91 98765 11111',
    },
    {
        id: 2,
        name: 'Priya Singh',
        attendance: 65,
        trend: 'down',
        lastPresent: '12 Oct 2025',
        contact: '+91 98765 22222',
    },
    {
        id: 3,
        name: 'Amit Patel',
        attendance: 58,
        trend: 'down',
        lastPresent: '28 Sep 2025',
        contact: '+91 98765 33333',
    },
    {
        id: 4,
        name: 'Neha Sharma',
        attendance: 68,
        trend: 'down',
        lastPresent: '15 Oct 2025',
        contact: '+91 98765 44444',
    },
    {
        id: 5,
        name: 'Vikram Desai',
        attendance: 55,
        trend: 'down',
        lastPresent: '05 Sep 2025',
        contact: '+91 98765 55555',
    },
    {
        id: 6,
        name: 'Anjali Gupta',
        attendance: 70,
        trend: 'down',
        lastPresent: '20 Oct 2025',
        contact: '+91 98765 66666',
    },
    {
        id: 7,
        name: 'Rohan Singh',
        attendance: 60,
        trend: 'down',
        lastPresent: '08 Oct 2025',
        contact: '+91 98765 77777',
    },
    {
        id: 8,
        name: 'Maya Patel',
        attendance: 62,
        trend: 'down',
        lastPresent: '18 Oct 2025',
        contact: '+91 98765 88888',
    },
], onSendAlert = () => {}, onCall = () => {}, onScheduleCall = () => {}, onExportList = () => {} }) => {
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [sortConfig, setSortConfig] = useState({
        key: 'attendance',
        direction: 'asc'
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [callHistory, setCallHistory] = useState({})
    const [alertHistory, setAlertHistory] = useState({})

    const lowAttendanceMembers = useMemo(() => {
        return members.filter(m => m.attendance < ATTENDANCE_THRESHOLD)
    }, [members])

    const filteredAndSortedData = useMemo(() => {
        let result = lowAttendanceMembers.filter(row =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.contact.includes(searchTerm)
        )

        result.sort((a, b) => {
            const aValue = a[sortConfig.key]
            const bValue = b[sortConfig.key]

            let comparison = 0
            if (typeof aValue === 'string') {
                comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase())
            } else {
                comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            }

            return sortConfig.direction === 'asc' ? comparison : -comparison
        })

        return result
    }, [lowAttendanceMembers, searchTerm, sortConfig])

    const criticalCount = lowAttendanceMembers.filter(m => m.attendance < 60).length

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(new Set(filteredAndSortedData.map(m => m.id)))
        } else {
            setSelectedRows(new Set())
        }
    }

    const handleSelectRow = (id) => {
        const newSelected = new Set(selectedRows)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedRows(newSelected)
    }

    const handleSort = (columnKey) => {
        setSortConfig(prev => ({
            key: columnKey,
            direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
    }

    const handleSendAlert = async (ids = null) => {
        setLoading(true)
        try {
            const targetIds = ids || Array.from(selectedRows)
            setTimeout(() => {
                targetIds.forEach(id => {
                    setAlertHistory(prev => ({
                        ...prev,
                        [id]: new Date().toLocaleString()
                    }))
                })
                setSuccess(`Alert sent to ${targetIds.length} member(s)`)
                setTimeout(() => setSuccess(null), 2000)
            }, 500)
            onSendAlert(targetIds)
        } finally {
            setLoading(false)
        }
    }

    const handleCall = async (id) => {
        setLoading(true)
        try {
            setTimeout(() => {
                setCallHistory(prev => ({
                    ...prev,
                    [id]: new Date().toLocaleString()
                }))
                setSuccess('Call initiated')
                setTimeout(() => setSuccess(null), 2000)
            }, 500)
            onCall(id)
        } finally {
            setLoading(false)
        }
    }

    const handleScheduleCall = async () => {
        setLoading(true)
        try {
            setTimeout(() => {
                setSuccess('1-on-1 calls scheduled for all low attendance members')
                setTimeout(() => setSuccess(null), 2000)
            }, 500)
            onScheduleCall(Array.from(selectedRows))
        } finally {
            setLoading(false)
        }
    }

    const handleExportList = async () => {
        setLoading(true)
        try {
            const csv = [
                ['MEMBER NAME', 'ATTENDANCE %', 'LAST PRESENT DATE', 'CONTACT INFORMATION'].join(','),
                ...filteredAndSortedData.map(row =>
                    [row.name, row.attendance, row.lastPresent, row.contact].map(v => `"${v}"`).join(',')
                )
            ].join('\n')

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
            const link = document.createElement('a')
            const url = URL.createObjectURL(blob)
            link.setAttribute('href', url)
            link.setAttribute('download', `low-attendance-alert-${new Date().toISOString().split('T')[0]}.csv`)
            link.style.visibility = 'hidden'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            setSuccess('List exported successfully')
            setTimeout(() => setSuccess(null), 2000)
        } finally {
            setLoading(false)
        }
    }

    const getAttendanceColor = (percentage) => {
        if (percentage >= 75) return 'text-green-600 bg-green-50'
        if (percentage >= 60) return 'text-orange-600 bg-orange-50'
        return 'text-red-600 bg-red-50'
    }

    const getTrendIcon = (trend) => {
        return trend === 'down' ? '▼' : '▲'
    }

    const getTrendColor = (trend) => {
        return trend === 'down' ? 'text-red-600' : 'text-green-600'
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                            Low Attendance Alert
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            Members Below {ATTENDANCE_THRESHOLD}% Threshold
                        </p>
                    </div>
                    <div className="inline-flex items-center gap-3 bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                        <span className="text-lg">⚠️</span>
                        <span>Critical ({criticalCount} members)</span>
                    </div>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Search Member or Phone
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Type member name or phone number..."
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Sort by Attendance:
                            </label>
                            <button
                                onClick={() => handleSort('attendance')}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {sortConfig.direction === 'asc' ? '↑ Lowest First' : '↓ Highest First'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Low Attendance Members</p>
                        <p className="text-3xl font-bold text-red-600 dark:text-red-400">{filteredAndSortedData.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Critical (&lt;60%)</p>
                        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{criticalCount}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Average Attendance</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                            {filteredAndSortedData.length > 0
                                ? (filteredAndSortedData.reduce((a, b) => a + b.attendance, 0) / filteredAndSortedData.length).toFixed(1)
                                : 0}%
                        </p>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-900 dark:bg-black border-b border-gray-300 dark:border-gray-700">
                                    <th className="px-4 py-4 text-left w-8">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="rounded accent-blue-500 w-4 h-4"
                                        />
                                    </th>
                                    {TABLE_COLUMNS.map(col => (
                                        <th
                                            key={col.key}
                                            onClick={() => col.sortable && handleSort(col.key)}
                                            className={`px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wide ${col.width} ${col.sortable ? 'cursor-pointer hover:bg-gray-800' : ''} transition-colors`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedData.length > 0 ? (
                                    filteredAndSortedData.map((row, idx) => (
                                        <tr
                                            key={row.id}
                                            className={`border-b border-gray-200 dark:border-gray-700 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors`}
                                        >
                                            <td className="px-4 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.has(row.id)}
                                                    onChange={() => handleSelectRow(row.id)}
                                                    className="rounded accent-blue-500 w-4 h-4"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-50 flex-1 min-w-[150px]">
                                                {row.name}
                                            </td>
                                            <td className="px-4 py-4 text-sm font-bold w-32">
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getAttendanceColor(row.attendance)}`}>
                                                    {row.attendance}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-lg font-bold w-16">
                                                <span className={getTrendColor(row.trend)}>
                                                    {getTrendIcon(row.trend)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-50 w-32">
                                                {row.lastPresent}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-50 font-mono w-40">
                                                {row.contact}
                                            </td>
                                            <td className="px-4 py-4 w-52">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleSendAlert([row.id])}
                                                            disabled={loading}
                                                            className="flex-1 px-3 py-1 rounded text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-colors"
                                                        >
                                                            Send Alert
                                                        </button>
                                                        <button
                                                            onClick={() => handleCall(row.id)}
                                                            disabled={loading}
                                                            className="px-3 py-1 rounded text-xs font-semibold bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 transition-colors"
                                                        >
                                                            Call
                                                        </button>
                                                    </div>
                                                    <button
                                                        className="w-full px-3 py-1 rounded text-xs font-semibold bg-gray-300 hover:bg-gray-400 text-gray-900 transition-colors"
                                                        onClick={() => {
                                                            const timestamp = callHistory[row.id] || alertHistory[row.id]
                                                            if (timestamp) {
                                                                alert(`Last contact: ${timestamp}`)
                                                            } else {
                                                                alert('No history available')
                                                            }
                                                        }}
                                                    >
                                                        View History
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={TABLE_COLUMNS.length + 1} className="px-4 py-8 text-center text-gray-600 dark:text-gray-400 text-sm">
                                            No members with low attendance found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => handleSendAlert()}
                            disabled={selectedRows.size === 0 || loading}
                            className="flex-1 px-6 py-3 rounded-lg font-bold text-sm bg-yellow-400 hover:bg-yellow-500 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md hover:shadow-lg"
                        >
                            Send Engagement Alert to All
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleScheduleCall}
                            disabled={selectedRows.size === 0 || loading}
                            className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-gray-600"
                        >
                            Schedule 1-on-1 Call
                        </button>
                        <button
                            onClick={handleExportList}
                            disabled={loading}
                            className="flex-1 px-6 py-3 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-gray-600"
                        >
                            Export List
                        </button>
                    </div>
                </div>

                <div className="mt-8 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 sm:p-6">
                    <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 uppercase mb-2">Recommended Actions:</h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li>✓ Send engagement alerts to members below 60% attendance</li>
                        <li>✓ Schedule 1-on-1 calls with critical members (less than 60%)</li>
                        <li>✓ Review attendance trends and identify barriers to participation</li>
                        <li>✓ Follow up on members who haven't been present in the last 2 weeks</li>
                    </ul>
                </div>

                <div className="mt-6 text-center text-xs text-gray-600 dark:text-gray-400">
                    <p>Last updated: {new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default LowAttendanceAlert