import { useState, useMemo } from 'react'
import SiteButton from "./SiteButton"

const TABLE_COLUMNS = [
    { key: 'rank', label: '↑↓ RANK', sortable: true, width: 'w-12' },
    { key: 'name', label: '↑↓ MEMBER NAME', sortable: true, width: 'flex-1 min-w-[140px]' },
    { key: 'company', label: '↑↓ COMPANY', sortable: true, width: 'flex-1 min-w-[150px]' },
    { key: 'referralsGiven', label: '↑↓REFERRALS GIVEN', sortable: true, width: 'w-24' },
    { key: 'businessMade', label: '↑↓ BUSINESS MADE', sortable: true, width: 'w-28' },
    { key: 'visitorsBrought', label: '↑↓VISITORS BROUGHT', sortable: true, width: 'w-24' },
    { key: 'mToM', label: '↑↓ M TO M', sortable: true, width: 'w-16' },
    { key: 'approvalStatus', label: '↑↓ APPROVAL STATUS', sortable: true, width: 'w-32' },
    { key: 'attendance', label: '↑↓ ATTENDANCE', sortable: true, width: 'w-28' },
    { key: 'actions', label: 'ACTIONS', sortable: false, width: 'w-40' },
]

const SORT_OPTIONS = [
    { value: 'businessMade', label: 'Business Made (Default)' },
    { value: 'referralsGiven', label: 'Referrals Given' },
    { value: 'mToM', label: 'M to M' },
    { value: 'visitorsBrought', label: 'Visitors Brought' },
    { value: 'rank', label: 'Roster' },
]

const ATTENDANCE_OPTIONS = ['Present', 'Absent']

function parseBusinessValue(value) {
    if (typeof value !== 'string') return 0
    const match = value.match(/₹([\d.]+)\s*(?:Lakhs|cr)/)
    return match ? parseFloat(match[1]) : 0
}

function getTotalRow(data) {
    return {
        rank: null,
        name: 'TOTAL (All Members)',
        company: '',
        referralsGiven: data.reduce((a, b) => a + (Number(b.referralsGiven) || 0), 0),
        businessMade: `₹${data.reduce((a, b) => a + parseBusinessValue(b.businessMade), 0).toFixed(1)}cr`,
        visitorsBrought: data.reduce((a, b) => a + (Number(b.visitorsBrought) || 0), 0),
        mToM: data.reduce((a, b) => a + (Number(b.mToM) || 0), 0),
        approvalStatus: '–',
        attendance: '–',
        actions: '–',
    }
}

const getSortValue = (value, columnKey) => {
    if (columnKey.includes('business') || columnKey.includes('Made')) {
        return parseBusinessValue(value)
    }
    if (typeof value === 'string') {
        return value.toLowerCase()
    }
    return value || 0
}

const MemberActivityReport = (
    { members = [
        {
            id: 1,
            rank: 1,
            name: 'Deepak',
            company: 'Trading House',
            referralsGiven: 8,
            businessMade: '₹80 Lakhs',
            visitorsBrought: 2,
            mToM: 5,
            approvalStatus: 'APPROVED',
            attendance: 'Present',
        },
        {
            id: 2,
            rank: 2,
            name: 'Gnanavel',
            company: 'Export Services',
            referralsGiven: 7,
            businessMade: '₹70 Lakhs',
            visitorsBrought: 3,
            mToM: 4,
            approvalStatus: 'APPROVED',
            attendance: 'Present',
        },
        {
            id: 3,
            rank: 3,
            name: 'Sedhu',
            company: 'Consulting Firm',
            referralsGiven: 6,
            businessMade: '₹60 Lakhs',
            visitorsBrought: 1,
            mToM: 3,
            approvalStatus: 'PENDING',
            attendance: 'Absent',
        },
        {
            id: 4,
            rank: 4,
            name: 'Balaji UPVC',
            company: 'UPVC Solutions',
            referralsGiven: 4,
            businessMade: '₹50 Lakhs',
            visitorsBrought: 4,
            mToM: 6,
            approvalStatus: 'APPROVED',
            attendance: 'Present',
        },
        {
            id: 5,
            rank: 5,
            name: 'Madhu',
            company: 'Services',
            referralsGiven: 5,
            businessMade: '₹40 Lakhs',
            visitorsBrought: 2,
            mToM: 2,
            approvalStatus: 'PENDING',
            attendance: 'Present',
        },
        {
            id: 6,
            rank: 6,
            name: 'Sathishkumar',
            company: 'Education Services',
            referralsGiven: 4,
            businessMade: '₹35 Lakhs',
            visitorsBrought: 1,
            mToM: 3,
            approvalStatus: 'APPROVED',
            attendance: 'Present',
        },
    ], onMeetingSelect = () => { }, onApprove = () => { } }) => {
    const [selectedMeeting, setSelectedMeeting] = useState('all')
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [sortConfig, setSortConfig] = useState({
        key: 'businessMade',
        direction: 'desc'
    })
    const [memberData, setMemberData] = useState(members)
    const [showDetailsModal, setShowDetailsModal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)

    const meetings = [
        { id: 'all', label: 'Select Meeting' },
        { id: 'nov9', label: 'November 9, 2025' },
        { id: 'nov16', label: 'November 16, 2025' },
        { id: 'nov23', label: 'November 23, 2025' },
    ]

    const filteredAndSortedData = useMemo(() => {
        let result = [...memberData]

        result.sort((a, b) => {
            const aValue = getSortValue(a[sortConfig.key], sortConfig.key)
            const bValue = getSortValue(b[sortConfig.key], sortConfig.key)

            let comparison = 0
            if (aValue < bValue) {
                comparison = -1
            } else if (aValue > bValue) {
                comparison = 1
            }

            return sortConfig.direction === 'desc' ? -comparison : comparison
        })

        return result
    }, [memberData, sortConfig])

    const TOTAL_ROW = getTotalRow(filteredAndSortedData)

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
            direction: prev.key === columnKey && prev.direction === 'desc' ? 'asc' : 'desc'
        }))
    }

    const handleApproveAll = async () => {
        setLoading(true)
        try {
            const updated = memberData.map(m =>
                selectedRows.has(m.id) ? { ...m, approvalStatus: 'APPROVED' } : m
            )
            setMemberData(updated)
            setSelectedRows(new Set())
            setSuccess(`${selectedRows.size} member(s) approved successfully`)
            setTimeout(() => setSuccess(null), 2000)
            onApprove(Array.from(selectedRows))
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async () => {
        setLoading(true)
        try {
            //Submit trigerring d=will be done here
        } finally {
            setLoading(false)
        }
    }

    const handleApproveRow = async (id) => {
        setLoading(true)
        try {
            const updated = memberData.map(m =>
                m.id === id ? { ...m, approvalStatus: 'APPROVED' } : m
            )
            setMemberData(updated)
            setSuccess('Member approved successfully')
            setTimeout(() => setSuccess(null), 2000)
            onApprove([id])
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateAttendance = (id, attendance) => {
        const updated = memberData.map(m =>
            m.id === id ? { ...m, attendance } : m
        )
        setMemberData(updated)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-700 border-green-300'
            case 'REJECTED':
                return 'bg-red-100 text-red-700 border-red-300'
            case 'PENDING':
                return 'bg-orange-100 text-orange-700 border-orange-300'
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300'
        }
    }

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="mt-20 w-full flex flex-2 justify-between">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                            Members and Referral Growth Hub <span className="text-base font-normal text-gray-500">9 Nov 2025</span>
                        </h1>
                        <div className="w-fit">
                            <SiteButton
                                content="View All Details"
                                to="/memberdetailedanalytics"
                            />
                        </div>
                    </div>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Select Meeting
                            </label>
                            <select
                                value={selectedMeeting}
                                onChange={(e) => {
                                    setSelectedMeeting(e.target.value)
                                    onMeetingSelect(e.target.value)
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-red-700"
                            >
                                {meetings.map(m => (
                                    <option key={m.id} value={m.id}>{m.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                    className="rounded accent-amber-300 w-4 h-4"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Select All</span>
                            </label>
                        </div>

                    </div>
                    <div className='flex flex-wrap justify-between gap-3'>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleApproveAll}
                                disabled={selectedRows.size === 0 || loading}
                                className="flex-1 sm:flex-initial px-6 py-2 rounded-lg font-bold text-sm bg-yellow-400 hover:bg-yellow-500 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Approve All Selected
                            </button>
                            <button
                                onClick={() => setSelectedRows(new Set())}
                                className="flex-1 sm:flex-initial px-6 py-2 rounded-lg font-semibold text-sm bg-gray-300 hover:bg-gray-400 text-gray-900 transition-colors"
                            >
                                Clear Selection
                            </button>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="flex-1 sm:flex-initial px-6 py-2 rounded-lg font-bold text-sm bg-green-500 hover:bg-green-600 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors max-h-12"
                        >
                            Submit Form
                        </button>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between'>
                    <div className="text-left text-sm text-gray-600 mb-2 dark:text-gray-400">
                        <p className="font-semibold">Selected: <span className="text-blue-600 dark:text-blue-400">{selectedRows.size} member{selectedRows.size !== 1 ? 's' : ''}</span></p>
                    </div>

                    <p className="text-gray-900 dark:text-gray-100 text-md mb-2">
                        <span className='font-bold'>Note* : </span>Fields with (↑↓) can be sorted in ascending or descending order.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-auto max-h-[800px]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-800 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700">
                                    <th className="px-4 py-3 text-left w-8">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.size === filteredAndSortedData.length && filteredAndSortedData.length > 0}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="rounded accent-amber-300 w-4 h-4"
                                        />
                                    </th>
                                    {TABLE_COLUMNS.map(col => (
                                        <th
                                            key={col.key}
                                            onClick={() => col.sortable && handleSort(col.key)}
                                            className={`px-3 sm:px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wide ${col.width} ${col.sortable ? 'cursor-pointer hover:bg-gray-700' : ''} transition-colors`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedData.map((row, idx) => (
                                    <tr
                                        key={row.id}
                                        className={`border-b border-gray-200 dark:border-gray-700 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-900/50`}
                                    >
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                                className="rounded accent-amber-300 w-4 h-4"
                                            />
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-semibold w-12">
                                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${row.rank === 1 ? 'bg-yellow-300 text-yellow-900' : row.rank === 2 ? 'bg-gray-300 text-gray-900' : row.rank === 3 ? 'bg-orange-300 text-orange-900' : 'bg-gray-500 text-white'}`}>
                                                {row.rank}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-semibold flex-1 min-w-[140px]">
                                            {row.name}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex-1 min-w-[150px]">
                                            {row.company}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium w-24">
                                            {row.referralsGiven}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-semibold w-28">
                                            {row.businessMade}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium w-24">
                                            {row.visitorsBrought}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium w-16">
                                            {row.mToM}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm w-32">
                                            <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs border ${getStatusColor(row.approvalStatus)}`}>
                                                {row.approvalStatus}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm w-28">
                                            <select
                                                value={row.attendance}
                                                onChange={(e) => handleUpdateAttendance(row.id, e.target.value)}
                                                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xs focus:ring-2 focus:ring-amber-300"
                                            >
                                                {ATTENDANCE_OPTIONS.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm w-40">
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleApproveRow(row.id)}
                                                    disabled={loading}
                                                    className="px-3 py-1 rounded border-1 border-gray-600 bg-green-500/80 hover:bg-green-400/50 text-black font-semibold text-xs disabled:opacity-50"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => setShowDetailsModal(row.id)}
                                                    className="px-3 py-1 rounded border-1 border-gray-600 bg-amber-50/50 hover:bg-amber-100/50 text-black font-semibold text-xs"
                                                >
                                                    Details
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-600">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3"></td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50"></td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.name}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.company}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.referralsGiven}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.businessMade}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.visitorsBrought}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.mToM}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-50">
                                            {TOTAL_ROW.approvalStatus}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3"></td>
                                        <td className="px-3 sm:px-4 py-3"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {showDetailsModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                            {(() => {
                                const member = memberData.find(m => m.id === showDetailsModal)
                                return (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">
                                            {member?.name} Details
                                        </h2>
                                        <div className="space-y-3 mb-6">
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Company</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.company}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Referrals Given</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.referralsGiven}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Business Made</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.businessMade}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Approval Status</p>
                                                <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs border mt-1 ${getStatusColor(member?.approvalStatus)}`}>
                                                    {member?.approvalStatus}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Attendance</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.attendance}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowDetailsModal(null)}
                                            className="w-full px-4 py-2 rounded-lg bg-amber-300 hover:bg-amber-400 text-black font-semibold"
                                        >
                                            Close
                                        </button>
                                    </>
                                )
                            })()}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default MemberActivityReport