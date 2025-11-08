import React, { useState, useEffect } from "react";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const MemberCard = ({ member, onSendReminder, loading }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4 mb-3 shadow-sm transition-colors duration-200">
    <div className="flex-1 mb-4 sm:mb-0">
      <div className="font-bold text-lg text-gray-900 dark:text-gray-50">
        {member.name}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Email: {member.email}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        Due: {member.dueDate}
      </div>
      <div className="italic text-xs text-gray-500 dark:text-gray-500 mt-2">
        Status: {member.status}
      </div>
    </div>
    <button
      onClick={() => onSendReminder(member)}
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

function getStatus(renewal, active) {
  if (!active) return "Inactive";
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const renewDate = new Date(renewal);
  renewDate.setHours(0, 0, 0, 0);
  if (renewDate < now) return "Overdue";
  return "Pending notification";
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function getStartOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getEndOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

const MemberRenewalManagement = ({ refreshTrigger }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger]);

  const fetchMembers = async () => {
    setFetching(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/chapter/membership/getallmemberships`, {
        credentials: "include",
        method: "GET"
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to load memberships");
      }
      const list = await res.json();
      setMembers(list.map(m => ({
        id: m._id,
        name: m.user?.username || "Unknown",
        userId: m.user?._id,
        email: m.user?.email || "N/A",
        dueDate: formatDate(m.renewal_date),
        rawDueDate: m.renewal_date,
        status: getStatus(m.renewal_date, m.membership_status),
        chapter: m.chapter?.chapter_name || "",
        membershipStatus: m.membership_status,
      })));
    } catch (err) {
      setError(err.message || "Failed to fetch members");
    } finally {
      setFetching(false);
    }
  };

  const getFilteredMembers = () => {
    const now = new Date();
    const today = getStartOfDay(now);
    const endOfWeek = new Date(today);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    let filtered = members;

    if (activeFilter === "thisMonth") {
      filtered = members.filter(m => {
        if (m.status !== "Pending notification" && m.status !== "Overdue") return false;
        if (!m.rawDueDate) return false;
        const dueDate = getStartOfDay(new Date(m.rawDueDate));
        return dueDate >= startOfMonth && dueDate <= endOfMonth;
      });
    } else if (activeFilter === "thisWeek") {
      filtered = members.filter(m => {
        if (m.status !== "Pending notification" && m.status !== "Overdue") return false;
        if (!m.rawDueDate) return false;
        const dueDate = getStartOfDay(new Date(m.rawDueDate));
        return dueDate >= today && dueDate <= endOfWeek;
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
        compareA = new Date(a.rawDueDate || 0);
        compareB = new Date(b.rawDueDate || 0);
      } else if (sortBy === "status") {
        compareA = a.status.toLowerCase();
        compareB = b.status.toLowerCase();
      }

      if (sortOrder === "asc") {
        return compareA > compareB ? 1 : compareA < compareB ? -1 : 0;
      } else {
        return compareA < compareB ? 1 : compareA > compareB ? -1 : 0;
      }
    });

    return sorted;
  };

  const handleSendReminder = async (member) => {
    setSelectedReminder(member.id);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        receiver: member.name,
        header: "Membership Renewal Reminder",
        content: `Hello ${member.name},\n\nThis is a reminder that your membership renewal is due on ${member.dueDate}.\n\nChapter: ${member.chapter}\n\nPlease complete your renewal at your earliest convenience.\n\nThank you!`
      };

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/notification/createnotificationwithoutsender`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send reminder");
      }

      setSuccess(`Reminder sent to ${member.name}`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(`Failed to send reminder to ${member.name}: ${err.message}`);
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
      setSelectedReminder(null);
    }
  };

  const handleAutoSendReminders = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const currentList = getFilteredMembers();

      if (currentList.length === 0) {
        setError("No members to send reminders to");
        return;
      }

      let sentCount = 0;
      let failedCount = 0;

      for (let member of currentList) {
        try {
          const payload = {
            receiver: member.name,
            header: "Membership Renewal Reminder",
            content: `Hello ${member.name},\n\nThis is a reminder that your membership renewal is due on ${member.dueDate}.\n\nChapter: ${member.chapter}\n\nPlease complete your renewal at your earliest convenience.\n\nThank you!`
          };

          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/notification/createnotificationwithoutsender`,
            {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            }
          );

          if (res.ok) {
            sentCount += 1;
          } else {
            failedCount += 1;
          }
        } catch (err) {
          failedCount += 1;
        }
      }

      if (sentCount > 0) {
        setSuccess(`Reminders sent to ${sentCount} member(s)${failedCount > 0 ? ` (${failedCount} failed)` : ''}`);
      } else {
        setError("Failed to send reminders to any members");
      }

      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError("Failed to process bulk reminders");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleExportList = () => {
    try {
      const visibleMembers = getFilteredMembers();

      if (visibleMembers.length === 0) {
        setError("No members to export");
        return;
      }

      const csvContent = [
        ["Name", "Email", "Due Date", "Status", "Chapter"],
        ...visibleMembers.map((m) => [m.name, m.email, m.dueDate, m.status, m.chapter]),
      ]
        .map((row) => row.map(cell => `"${cell}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `member_renewals_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setSuccess("Export completed successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to export list");
      setTimeout(() => setError(null), 3000);
    }
  };

  const now = new Date();
  const today = getStartOfDay(now);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(endOfWeek.getDate() + 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const overdueCount = members.filter((m) => m.status === "Overdue").length;

  const dueThisMonthCount = members.filter((m) => {
    if (m.status !== "Pending notification" && m.status !== "Overdue") return false;
    if (!m.rawDueDate) return false;
    const dueDate = getStartOfDay(new Date(m.rawDueDate));
    return dueDate >= startOfMonth && dueDate <= endOfMonth;
  }).length;

  const dueThisWeekCount = members.filter((m) => {
    if (m.status !== "Pending notification" && m.status !== "Overdue") return false;
    if (!m.rawDueDate) return false;
    const dueDate = getStartOfDay(new Date(m.rawDueDate));
    return dueDate >= today && dueDate <= endOfWeek;
  }).length;

  const filteredMembers = getFilteredMembers();

  return (
    <div className="w-full rounded-2xl p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
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

      <div className="mb-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
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
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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

      {fetching && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-200">Loading members...</p>
        </div>
      )}

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

      <div className="mb-6 max-h-[280px] overflow-auto">
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
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              {activeFilter ? "No members match this filter" : "No members found"}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={handleAutoSendReminders}
          disabled={loading || filteredMembers.length === 0 || fetching}
          className="w-full px-4 py-3 rounded-lg border border-amber-300 font-medium bg-amber-300 text-gray-900 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? "Sending..." : `Auto-Send Reminders (${filteredMembers.length})`}
        </button>

        <button
          onClick={handleExportList}
          disabled={loading || filteredMembers.length === 0 || fetching}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-medium bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Export List ({filteredMembers.length})
        </button>
      </div>
    </div>
  );
};

export default MemberRenewalManagement;
