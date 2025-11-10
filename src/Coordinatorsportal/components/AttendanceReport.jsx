import { useState, useMemo, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

const TABLE_COLUMNS = [
  { key: 'name', label: '↑↓ MEMBER NAME', sortable: true, width: 'flex-1 min-w-[150px]' },
  { key: 'attendance', label: '↑↓ ATTENDANCE %', sortable: true, width: 'w-32' },
  { key: 'presentCount', label: '↑↓ PRESENT', sortable: true, width: 'w-20' },
  { key: 'totalMeetings', label: '↑↓ TOTAL MEETINGS', sortable: true, width: 'w-28' },
  { key: 'lastPresent', label: '↑↓ LAST PRESENT DATE', sortable: true, width: 'w-32' },
  { key: 'contact', label: 'CONTACT', sortable: false, width: 'w-40' },
  { key: 'actions', label: 'ACTIONS', sortable: false, width: 'w-32' },
];

const AttendanceOverview = () => {
  const [members, setMembers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'attendance', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchAttendance() {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/meeting/attendance/getallattendances`, {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch attendance');
        const data = await res.json();
        processAttendanceData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  function processAttendanceData(data) {
    const userMap = {};
    data.forEach(record => {
      const userId = record.user._id;
      if (!userMap[userId]) {
        userMap[userId] = {
          id: userId,
          name: record.user.username,
          contact: record.user.phone_number,
          totalMeetings: 0,
          presentCount: 0,
          lastPresentDate: null,
        };
      }
      userMap[userId].totalMeetings++;
      if (record.attendance_status === 'present') {
        userMap[userId].presentCount++;
        const recordDate = new Date(record.date);
        if (!userMap[userId].lastPresentDate || recordDate > new Date(userMap[userId].lastPresentDate)) {
          userMap[userId].lastPresentDate = record.date;
        }
      }
    });
    const processedMembers = Object.values(userMap).map(user => ({
      ...user,
      attendance: user.totalMeetings > 0 ? Math.round((user.presentCount / user.totalMeetings) * 100) : 0,
      lastPresent: user.lastPresentDate
        ? new Date(user.lastPresentDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        : 'N/A'
    }));
    setMembers(processedMembers);
  }

  const filteredAndSortedData = useMemo(() => {
    let result = members.filter(
      row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.contact.includes(searchTerm)
    );
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      let comparison = 0;
      if (typeof aValue === 'string') {
        comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      } else {
        comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
    return result;
  }, [members, searchTerm, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const averageAttendance = members.length > 0
    ? Math.round(members.reduce((a, b) => a + b.attendance, 0) / members.length)
    : 0;

  const handleSort = columnKey => {
    setSortConfig(prev => ({
      key: columnKey,
      direction: prev.key === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  const handleViewHistory = async userId => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/meeting/attendance/getattendanceofuser/${userId}`, {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch user attendance');
      const data = await res.json();
      setModalData(data);
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    setLoading(true);
    try {
      const csv = [
        ['MEMBER NAME', 'ATTENDANCE %', 'PRESENT', 'TOTAL MEETINGS', 'LAST PRESENT DATE', 'CONTACT'].join(','),
        ...filteredAndSortedData.map(row =>
          [row.name, row.attendance, row.presentCount, row.totalMeetings, row.lastPresent, row.contact]
            .map(v => `"${v}"`)
            .join(',')
        )
      ].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `attendance-overview-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSuccess('Attendance data exported successfully');
      setTimeout(() => setSuccess(null), 2000);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceColor = percentage => {
    if (percentage >= 75) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  if (loading && members.length === 0) return <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>;
  if (error && members.length === 0) return <div className="w-full min-h-screen flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">Attendance Overview</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Track attendance details for all members</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Total Members</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{members.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Average Attendance</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{averageAttendance}%</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">High Attendance (75%+)</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {members.filter(m => m.attendance >= 75).length}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold uppercase mb-1">Low Attendance (&lt;75%)</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {members.filter(m => m.attendance < 75).length}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Search Member or Phone
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Type member name or phone number..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-end">
              <button
                onClick={handleExport}
                disabled={loading}
                className="flex-1 max-h-10 px-6 py-3 rounded-lg font-semibold text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-300 dark:border-gray-600"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>

        {success && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
          </div>
        )}

        <p className="text-gray-900 dark:text-gray-100 text-md mb-2">
          <span className="font-bold">Note*: </span>Fields with (↑↓) can be sorted in ascending or descending order.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-auto max-h-[600px]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 sticky top-0 dark:bg-black border-b border-white dark:border-gray-700">
                  {TABLE_COLUMNS.map(col => (
                    <th
                      key={col.key}
                      onClick={() => col.sortable && handleSort(col.key)}
                      className={`px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wide ${col.width} ${
                        col.sortable ? 'cursor-pointer hover:bg-gray-800' : ''
                      } transition-colors`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-b border-gray-200 dark:border-gray-700 ${
                        idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                      } hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors`}
                    >
                      <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-gray-50">{row.name}</td>
                      <td className="px-4 py-4 text-sm font-bold">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getAttendanceColor(row.attendance)}`}>
                          {row.attendance}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-50 font-semibold">{row.presentCount}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-50 font-semibold">{row.totalMeetings}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-50">{row.lastPresent}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 dark:text-gray-50 font-mono">{row.contact}</td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => handleViewHistory(row.id)}
                          disabled={loading}
                          className="px-4 py-2 rounded text-xs font-semibold bg-amber-300 hover:bg-amber-200 text-black disabled:opacity-50 transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={TABLE_COLUMNS.length} className="px-4 py-8 text-center text-gray-600 dark:text-gray-400 text-sm">
                      No members found
                    </td>
                  </tr>
                )}
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
              onChange={e => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 25, 50].map(option => (
                <option key={option} value={option}>
                  {option} per page
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <div className="flex gap-1 items-center">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) pageNum = i + 1;
                  else if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded text-sm font-medium transition-colors duration-200 ${
                        currentPage === pageNum
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Attendance Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50">
                <HiX size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {modalData.map((record, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Meeting: {record.meeting?.title}</p>
                      <p className="text-sm text-gray-900 dark:text-gray-50">Date: {new Date(record.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-900 dark:text-gray-50">Location: {record.meeting?.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        record.attendance_status === 'present'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.attendance_status === 'present' ? 'Present' : 'Absent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-end p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-50 rounded-lg font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceOverview;
