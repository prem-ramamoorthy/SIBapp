import React, { useState, useEffect } from "react";
import { HiChevronDown, HiArrowUp, HiArrowDown } from "react-icons/hi";

const MemberCard = ({ member, onSendReminder, loading }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 mb-3 shadow-sm transition-colors duration-200">
    <div className="flex-1 mb-4 sm:mb-0">
      <div className="font-bold text-lg text-gray-900 dark:text-gray-50">
        {member.name}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Due: {member.dueDate}
      </div>
      <div className="italic text-xs text-gray-500 dark:text-gray-500 mt-2">
        Status: {member.status}
      </div>
    </div>
    <button
      onClick={() => onSendReminder(member.id)}
      disabled={loading}
      className="ml-4 px-4 py-2 rounded-lg font-medium text-sm border border-amber-300 bg-amber-300 text-gray-900 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {loading ? 'Sending...' : 'Send Reminder'}
    </button>
  </div>
);

const FilterButton = ({ label, value, isActive, onClick, isAlert }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-lg border font-medium transition-colors duration-200 whitespace-nowrap
      ${isActive
        ? isAlert
          ? 'border-red-400 bg-red-300 text-red-900 dark:bg-red-700 dark:border-red-500 dark:text-red-100'
          : 'border-amber-400 bg-amber-300 text-gray-900 dark:bg-amber-600 dark:border-amber-500 dark:text-gray-900'
        : isAlert
        ? 'border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900'
        : 'border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
      }
    `}
  >
    <span>{label}:</span>
    <span className="ml-2 font-bold">{value}</span>
  </button>
);

const MemberRenewalManagement = ({ refreshTrigger }) => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Smith",
      dueDate: "5 Nov 2025",
      status: "Pending notification",
    },
    {
      id: 2,
      name: "Jane Doe",
      dueDate: "10 Nov 2025",
      status: "Pending notification",
    },
    {
      id: 3,
      name: "Mike Johnson",
      dueDate: "3 Nov 2025",
      status: "Overdue",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    console.log("Members data refreshed");
  }, [refreshTrigger]);

  const getFilteredMembers = () => {
    let filtered = members;

    if (activeFilter === "thisMonth") {
      filtered = members.filter(m => m.status === "Pending notification" || m.status === "Overdue");
    } else if (activeFilter === "thisWeek") {
      filtered = members.filter(m => {
        const dueDate = new Date(m.dueDate);
        const today = new Date();
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        return dueDate <= weekFromNow && dueDate >= today;
      });
    } else if (activeFilter === "overdue") {
      filtered = members.filter(m => m.status === "Overdue");
    }

    return sortMembers(filtered);
  };

  const sortMembers = (membersToSort) => {
    const sorted = [...membersToSort];
    sorted.sort((a, b) => {
      let compareA, compareB;

      if (sortBy === "name") {
        compareA = a.name.toLowerCase();
        compareB = b.name.toLowerCase();
      } else if (sortBy === "dueDate") {
        compareA = new Date(a.dueDate);
        compareB = new Date(b.dueDate);
      } else if (sortBy === "status") {
        compareA = a.status.toLowerCase();
        compareB = b.status.toLowerCase();
      }

      if (sortOrder === "asc") {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    return sorted;
  };

  const handleSendReminder = async (memberId) => {
    setSelectedReminder(memberId);
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const member = members.find((m) => m.id === memberId);
      setSuccess(`Reminder sent to ${member.name}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.log(err);
      setError(
        `Failed to send reminder to ${members.find((m) => m.id === memberId)?.name}`
      );
    } finally {
      setLoading(false);
      setSelectedReminder(null);
    }
  };

  const handleAutoSendReminders = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const visibleMembers = getFilteredMembers();
      setSuccess(`Reminders sent to ${visibleMembers.length} members`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.log(err);
      setError("Failed to send reminders");
    } finally {
      setLoading(false);
    }
  };

  const handleExportList = () => {
    try {
      const visibleMembers = getFilteredMembers();
      const csvContent = [
        ["Name", "Due Date", "Status"],
        ...visibleMembers.map((m) => [m.name, m.dueDate, m.status]),
      ]
        .map((row) => row.join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "member_renewals.csv";
      a.click();
      window.URL.revokeObjectURL(url);

      setSuccess("Export completed successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.log(err);
      setError("Failed to export list");
    }
  };

  const overdueCount = members.filter((m) => m.status === "Overdue").length;
  const dueThisMonthCount = members.filter(
    (m) => m.status === "Pending notification" || m.status === "Overdue"
  ).length;
  const dueThisWeekCount = members.filter((m) => {
    const dueDate = new Date(m.dueDate);
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return dueDate <= weekFromNow && dueDate >= today;
  }).length;

  const filteredMembers = getFilteredMembers();

  return (
    <div className="w-full rounded-2xl p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
        Member Renewal Management
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <FilterButton
          label="Due This Month"
          value={dueThisMonthCount}
          isActive={activeFilter === "thisMonth"}
          onClick={() =>
            setActiveFilter(activeFilter === "thisMonth" ? null : "thisMonth")
          }
          isAlert={false}
        />
        <FilterButton
          label="Due This Week"
          value={dueThisWeekCount}
          isActive={activeFilter === "thisWeek"}
          onClick={() =>
            setActiveFilter(activeFilter === "thisWeek" ? null : "thisWeek")
          }
          isAlert={false}
        />
        <FilterButton
          label="Overdue"
          value={overdueCount}
          isActive={activeFilter === "overdue"}
          onClick={() =>
            setActiveFilter(activeFilter === "overdue" ? null : "overdue")
          }
          isAlert={overdueCount > 0}
        />
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Sort By:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-amber-300 focus:ring-amber-300 dark:focus:border-amber-300 dark:focus:ring-amber-300 text-sm"
          >
            <option value="name">Name</option>
            <option value="dueDate">Due Date</option>
            <option value="status">Status</option>
          </select>
        </div>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {sortOrder === "asc" ? (
            <>
              <HiArrowUp className="h-4 w-4" />
              <span className="text-sm font-medium">Ascending</span>
            </>
          ) : (
            <>
              <HiArrowDown className="h-4 w-4" />
              <span className="text-sm font-medium">Descending</span>
            </>
          )}
        </button>

        {activeFilter && (
          <button
            onClick={() => setActiveFilter(null)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-sm font-medium"
          >
            Clear Filter
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
        </div>
      )}

      <div className="mb-6 max-h-[400px] overflow-auto">
        {filteredMembers.length > 0 ? (
          <div>
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onSendReminder={handleSendReminder}
                loading={loading && selectedReminder === member.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {activeFilter ? "No members match this filter" : "No members found"}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <button
          onClick={handleAutoSendReminders}
          disabled={loading || filteredMembers.length === 0}
          className="w-full px-4 py-3 rounded-lg border border-amber-300 font-medium bg-amber-300 text-gray-900 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? "Sending..." : "Auto-Send Reminders"}
        </button>

        <button
          onClick={handleExportList}
          disabled={loading || filteredMembers.length === 0}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-medium bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Export Renewal List
        </button>
      </div>
    </div>
  );
};

export default MemberRenewalManagement;