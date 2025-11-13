import { useState, useMemo, useEffect } from 'react';
import SiteButton from "./SiteButton";

const TABLE_COLUMNS = [
    { key: 'rank', label: '↑↓ RANK', sortable: true, width: 'w-12' },
    { key: 'name', label: '↑↓ MEMBER NAME', sortable: true, width: 'flex-1 min-w-[140px]' },
    { key: 'referralsGiven', label: '↑↓ REFERRALS GIVEN', sortable: true, width: 'w-30' },
    { key: 'businessMade', label: '↑↓ BUSINESS MADE', sortable: true, width: 'w-38' },
    { key: 'visitorsBrought', label: '↑↓ VISITORS BROUGHT', sortable: true, width: 'w-24' },
    { key: 'mToM', label: '↑↓ M TO M', sortable: true, width: 'w-24' },
    { key: 'approvalStatus', label: '↑↓ APPROVAL STATUS', sortable: true, width: 'w-32' },
    { key: 'attendance', label: '↑↓ ATTENDANCE', sortable: true, width: 'w-28' },
    { key: 'actions', label: 'ACTIONS', sortable: false, width: 'w-40' },
];

const ATTENDANCE_OPTIONS = ['Present', 'Absent'];

function getTotalRow(data) {
    return {
        rank: null,
        name: 'TOTAL (All Members)',
        referralsGiven: data.reduce((a, b) => a + (Number(b.referralsGiven) || 0), 0),
        businessMade: data.reduce((a, b) => a + (Number(b.businessMade) || 0), 0),
        visitorsBrought: data.reduce((a, b) => a + (Number(b.visitorsBrought) || 0), 0),
        mToM: data.reduce((a, b) => a + (Number(b.mToM) || 0), 0),
        approvalStatus: '–',
        attendance: '–',
    };
}

const getSortValue = (value) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return value.toLowerCase();
    return value || 0;
};

function MemberActivityReport() {
    const [memberData, setMemberData] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState('');
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortConfig, setSortConfig] = useState({ key: 'businessMade', direction: 'desc' });
    const [showDetailsModal, setShowDetailsModal] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showApprovalConfirmModal, setShowApprovalConfirmModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [submittedAttendances, setSubmittedAttendances] = useState(new Set());
    const [approvedMembers, setApprovedMembers] = useState(new Set());
    const [fetchLoading, setFetchLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        setFetchLoading(true);
        try {
            const [activitiesRes, meetingsRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_BACKEND_SERVER}/activity/getactivityofusersfalse`, {
                    credentials: 'include',
                }),
                fetch(`${import.meta.env.VITE_BACKEND_SERVER}/meeting/getfalsemeetings`, {
                    credentials: 'include',
                }),
            ]);

            if (!activitiesRes.ok || !meetingsRes.ok) throw new Error('Failed to fetch data');

            const activities = await activitiesRes.json();
            const meetingsData = await meetingsRes.json();

            const processedMembers = (activities || []).map((member) => ({
                ...member,
                approvalStatus: 'PENDING',
                attendance: 'Present',
            }));

            setMemberData(processedMembers);
            setMeetings(meetingsData || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setFetchLoading(false);
        }
    }

    const filteredAndSortedData = useMemo(() => {
        let result = [...memberData];
        result.sort((a, b) => {
            const aValue = getSortValue(a[sortConfig.key], sortConfig.key);
            const bValue = getSortValue(b[sortConfig.key], sortConfig.key);
            let comparison = 0;
            if (aValue < bValue) comparison = -1;
            else if (aValue > bValue) comparison = 1;
            return sortConfig.direction === 'desc' ? -comparison : comparison;
        });
        return result;
    }, [memberData, sortConfig]);

    const TOTAL_ROW = getTotalRow(filteredAndSortedData);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedRows(new Set(filteredAndSortedData.map((m) => m.id)));
        } else {
            setSelectedRows(new Set());
        }
    };

    const handleSelectRow = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
    };

    const handleSort = (columnKey) => {
        setSortConfig((prev) => ({
            key: columnKey,
            direction: prev.key === columnKey && prev.direction === 'desc' ? 'asc' : 'desc',
        }));
    };

    const handleUpdateAttendance = (id, attendance) => {
        if (submittedAttendances.has(id)) return;
        const updated = memberData.map((m) => (m.id === id ? { ...m, attendance } : m));
        setMemberData(updated);
    };

    const handleAttendanceSubmit = () => {
        if (!selectedMeeting) {
            setError('Please select a meeting first');
            return;
        }
        const hasAttendance = filteredAndSortedData.some((m) => m.attendance && !submittedAttendances.has(m.id));
        if (!hasAttendance) {
            setError('No attendance to submit');
            return;
        }
        setShowConfirmModal(true);
    };

    const confirmSubmitAttendance = async () => {
        setLoading(true);
        setShowConfirmModal(false);
        try {
            for (const member of filteredAndSortedData) {
                if (member.attendance && !submittedAttendances.has(member.id)) {
                    const today = new Date();
                    const formattedDate = today.toISOString().split('T')[0];
                    const data = {
                        username: member.name,
                        meeting_id: selectedMeeting,
                        attendance_status: member.attendance.toLowerCase(),
                        date: formattedDate,
                    };
                    await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/meeting/attendance/createattendance`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                    });
                    const confirm_data = {
                        _id: selectedMeeting,
                        attendance_status: true,
                    };
                    await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/meeting/updatemeeting`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(confirm_data),
                    });
                    setSubmittedAttendances((prev) => new Set([...prev, member.id]));
                }
            }
            setSuccess('Attendance submitted successfully');
            setTimeout(() => setSuccess(null), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveAll = () => {
        if (selectedRows.size === 0) {
            setError('Please select members to approve');
            return;
        }
        setShowApprovalConfirmModal(true);
    };

    const confirmApproveAll = async () => {
        setLoading(true);
        setShowApprovalConfirmModal(false);
        try {
            const selectedMembers = Array.from(selectedRows);
            for (const memberId of selectedMembers) {
                const notificationData = {
                    receiver: memberId,
                    header: "Approval Notification",
                    content: `Your meeting/business activity data has been approved by the coordinator in the meeting "${selectedMeeting}".`
                };
                await Promise.all([
                    fetch(`${import.meta.env.VITE_BACKEND_SERVER}/slips/referral/updatereferralstatusbyreferrer/${memberId}`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: true }),
                    }),
                    fetch(`${import.meta.env.VITE_BACKEND_SERVER}/slips/tyftb/updatetyftbstatusbypayer/${memberId}`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: true }),
                    }),
                    fetch(`${import.meta.env.VITE_BACKEND_SERVER}/slips/one2one/updatem2mstatusbyuserid/${memberId}`, {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: true }),
                    }),
                    fetch(`${import.meta.env.VITE_BACKEND_SERVER}/notification/createnotificationwithoutsender`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(notificationData),
                    }),
                ]);
                setApprovedMembers((prev) => new Set([...prev, memberId]));
            }

            const updated = memberData.map((m) =>
                selectedRows.has(m.id) ? { ...m, approvalStatus: 'APPROVED' } : m
            );
            setMemberData(updated);
            setSelectedRows(new Set());

            setSuccess(`${selectedMembers.length} member(s) approved successfully`);
            setTimeout(() => setSuccess(null), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveRow = async (memberId) => {
        if (approvedMembers.has(memberId)) {
            setError('Member already approved');
            return;
        }
        setLoading(true);
        try {
            await Promise.all([
                fetch(`${import.meta.env.VITE_BACKEND_SERVER}/slips/referral/updatereferralstatusbyreferrer/${memberId}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: true }),
                }),
                fetch(`${import.meta.env.VITE_BACKEND_SERVER}/slips/tyftb/updatetyftbstatusbypayer/${memberId}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: true }),
                }),
                fetch(`${import.meta.env.VITE_BACKEND_SERVER}/slips/one2one/updatem2mstatusbyuserid/${memberId}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: true }),
                }),
            ]);

            const updated = memberData.map((m) =>
                m.id === memberId ? { ...m, approvalStatus: 'APPROVED' } : m
            );
            setMemberData(updated);
            setApprovedMembers((prev) => new Set([...prev, memberId]));

            setSuccess('Member approved successfully');
            setTimeout(() => setSuccess(null), 2000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPROVED':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'REJECTED':
                return 'bg-red-100 text-red-700 border-red-300';
            case 'PENDING':
                return 'bg-orange-100 text-orange-700 border-orange-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    if (fetchLoading) return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="mt-20 w-full flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                            Members and Referral Growth Hub{' '}
                            <span className="text-base font-normal text-gray-500">{new Date().toLocaleDateString()}</span>
                        </h1>
                        <div className="w-fit">
                            <SiteButton content="View All Details" to="/memberdetailedanalytics" />
                        </div>
                    </div>
                </div>

                {success && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
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
                                onChange={(e) => setSelectedMeeting(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-red-700"
                            >
                                <option value="">Select a Meeting</option>
                                {meetings.map((m) => (
                                    <option key={m._id} value={m._id}>
                                        {m.title} - {new Date(m.meeting_date).toLocaleDateString()}
                                    </option>
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
                    <div className="flex flex-wrap justify-between gap-3">
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
                        <div className="flex flex-row gap-3.5">
                            <button
                                onClick={handleAttendanceSubmit}
                                disabled={loading || !selectedMeeting}
                                className="flex-1 sm:flex-initial px-6 py-2 rounded-lg font-bold text-sm bg-amber-300 hover:bg-amber-5  00 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Submit Attendances
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between">
                    <div className="text-left text-sm text-gray-600 mb-2 dark:text-gray-400">
                        <p className="font-semibold">
                            Selected: <span className="text-blue-600 dark:text-blue-400">{selectedRows.size} member{selectedRows.size !== 1 ? 's' : ''}</span>
                        </p>
                    </div>
                    <p className="text-gray-900 dark:text-gray-100 text-md mb-2">
                        <span className="font-bold">Note*: </span>Fields with (↑↓) can be sorted in ascending or descending order.
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
                                    {TABLE_COLUMNS.map((col) => (
                                        <th
                                            key={col.key}
                                            onClick={() => col.sortable && handleSort(col.key)}
                                            className={`px-3 sm:px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wide ${col.width} ${col.sortable ? 'cursor-pointer hover:bg-gray-700' : ''
                                                } transition-colors`}
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
                                        className={`border-b border-gray-200 dark:border-gray-700 ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                                            } hover:bg-gray-100 dark:hover:bg-gray-900/50`}
                                    >
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(row.id)}
                                                onChange={() => handleSelectRow(row.id)}
                                                disabled={approvedMembers.has(row.id)}
                                                className="rounded accent-amber-300 w-4 h-4 disabled:opacity-50"
                                            />
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-semibold w-12">
                                            <span
                                                className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${row.rank === 1
                                                    ? 'bg-yellow-300 text-yellow-900'
                                                    : row.rank === 2
                                                        ? 'bg-gray-300 text-gray-900'
                                                        : row.rank === 3
                                                            ? 'bg-orange-300 text-orange-900'
                                                            : 'bg-gray-500 text-white'
                                                    }`}
                                            >
                                                {row.rank}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-semibold flex-1 min-w-[140px]">
                                            {row.name}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium w-24">
                                            {row.referralsGiven}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-semibold w-28">
                                            {row.businessMade}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium w-24">
                                            {row.visitorsBrought}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm text-gray-900 dark:text-gray-50 font-medium w-16">
                                            {row.mToM}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm w-32">
                                            <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs border ${getStatusColor(row.approvalStatus)}`}>
                                                {row.approvalStatus}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm w-28">
                                            <select
                                                value={row.attendance}
                                                onChange={(e) => handleUpdateAttendance(row.id, e.target.value)}
                                                disabled={submittedAttendances.has(row.id)}
                                                className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xs focus:ring-2 focus:ring-amber-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {ATTENDANCE_OPTIONS.map((opt) => (
                                                    <option key={opt} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-xs text-center sm:text-sm w-40">
                                            <div className="flex flex-col gap-1">
                                                <button
                                                    onClick={() => handleApproveRow(row.id)}
                                                    disabled={loading || approvedMembers.has(row.id)}
                                                    className="px-3 py-1 rounded border-1 border-gray-600 bg-amber-300/80 hover:bg-amber-400/50 text-black font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                            <table className="w-full dark:text-white">
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-3"></td>
                                        <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm"></td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold flex-1 min-w-[140px]">
                                            {TOTAL_ROW.name}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-left text-xs sm:text-sm font-bold w-24">
                                            {TOTAL_ROW.referralsGiven}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-28">
                                            {TOTAL_ROW.businessMade}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-24">
                                            {TOTAL_ROW.visitorsBrought}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-24">
                                            {TOTAL_ROW.mToM}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-32">
                                            {TOTAL_ROW.approvalStatus}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 text-center text-xs sm:text-sm font-bold w-28">
                                            {TOTAL_ROW.attendance}
                                        </td>
                                        <td className="px-3 sm:px-4 py-3 w-40"></td>
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
                                const member = memberData.find((m) => m.id === showDetailsModal);
                                return (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">{member?.name} Details</h2>
                                        <div className="space-y-3 mb-6">
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Referrals Given</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.referralsGiven}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Business Made</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.businessMade}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Visitors Brought</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.visitorsBrought}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">M to M</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-50">{member?.mToM}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 uppercase font-semibold">Approval Status</p>
                                                <span className={`inline-block px-3 py-1 rounded-full font-bold text-xs border mt-1 ${getStatusColor(member?.approvalStatus)}`}>
                                                    {member?.approvalStatus}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setShowDetailsModal(null)}
                                            className="w-full px-4 py-2 rounded-lg bg-amber-300 hover:bg-amber-400 text-black font-semibold"
                                        >
                                            Close
                                        </button>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Confirm Attendance Submission</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Are you sure you want to submit attendance? This action cannot be changed.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowConfirmModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSubmitAttendance}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold disabled:opacity-50"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showApprovalConfirmModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-4">Confirm Approval</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                                Are you sure you want to approve {selectedRows.size} member(s)? This action will update referrals, TYB, and M2M status.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowApprovalConfirmModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmApproveAll}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-black font-semibold disabled:opacity-50"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemberActivityReport;
