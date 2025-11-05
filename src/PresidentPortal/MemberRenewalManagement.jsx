import React, { useState, useEffect } from "react"

const MemberCard = ({ member, onSendReminder, loading }) => (
  <div className="
    flex flex-col sm:flex-row sm:items-center justify-between
    rounded-lg border border-gray-200 dark:border-gray-700
    bg-gray-50 dark:bg-gray-900 p-4 mb-3
    shadow-sm transition-colors duration-200
  ">
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
      className="
        px-4 py-2 rounded-lg font-medium text-sm
        border border-gray-300 dark:border-gray-600
        bg-gray-100 dark:bg-gray-800 
        text-gray-900 dark:text-gray-100
        hover:bg-gray-200 dark:hover:bg-gray-700
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
      "
    >
      {loading ? 'Sending...' : 'Send Reminder'}
    </button>
  </div>
)

const StatusTag = ({ label, value, isAlert = false }) => (
  <div
    className={`
      px-4 py-2 rounded-full border font-medium transition-colors duration-200
      ${isAlert
        ? 'border-red-300 bg-red-50 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-300'
        : 'border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200'
      }
    `}
  >
    <span className="text-gray-600 dark:text-gray-400">{label}:</span>
    <span className={`ml-2 font-bold ${isAlert ? 'text-red-700 dark:text-red-300' : ''}`}>
      {value}
    </span>
  </div>
)

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
  ])

  const [loading, setLoading] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    // Refresh members when triggered
    console.log('Members data refreshed')
  }, [refreshTrigger])

  const handleSendReminder = async (memberId) => {
    setSelectedReminder(memberId)
    setLoading(true)
    setError(null)
    
    try {
      // API call placeholder
      await new Promise(resolve => setTimeout(resolve, 500))
      const member = members.find(m => m.id === memberId)
      setSuccess(`Reminder sent to ${member.name}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(`Failed to send reminder to ${members.find(m => m.id === memberId)?.name}`)
    } finally {
      setLoading(false)
      setSelectedReminder(null)
    }
  }

  const handleAutoSendReminders = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // API call placeholder
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(`Reminders sent to ${members.length} members`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to send reminders')
    } finally {
      setLoading(false)
    }
  }

  const handleExportList = () => {
    try {
      const csvContent = [
        ['Name', 'Due Date', 'Status'],
        ...members.map(m => [m.name, m.dueDate, m.status])
      ]
        .map(row => row.join(','))
        .join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'member_renewals.csv'
      a.click()
      window.URL.revokeObjectURL(url)
      
      setSuccess('Export completed successfully')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to export list')
    }
  }

  const overdueCount = members.filter(m => m.status === 'Overdue').length
  const dueThisMonthCount = members.length
  const dueThisWeekCount = 2

  return (
    <div className="
      w-full rounded-2xl p-4 sm:p-6 lg:p-8
      bg-white dark:bg-gray-800
      shadow-lg border border-gray-200 dark:border-gray-700
      transition-colors duration-300
    ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
        Member Renewal Management
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <StatusTag label="Due This Month" value={dueThisMonthCount} />
        <StatusTag label="Due This Week" value={dueThisWeekCount} />
        <StatusTag label="Overdue" value={overdueCount} isAlert={overdueCount > 0} />
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

      <div className="mb-6">
        {members.length > 0 ? (
          <div>
            {members.map(member => (
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
            <p className="text-gray-600 dark:text-gray-400">No members found</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <button className="
          w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
          font-medium bg-gray-100 dark:bg-gray-900 
          text-gray-900 dark:text-gray-100
          hover:bg-gray-200 dark:hover:bg-gray-800
          transition-colors duration-200
        ">
          View All
        </button>
        
        <button 
          onClick={handleAutoSendReminders}
          disabled={loading}
          className="
            w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
            font-medium bg-gray-100 dark:bg-gray-900 
            text-gray-900 dark:text-gray-100
            hover:bg-gray-200 dark:hover:bg-gray-800
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          {loading ? 'Sending...' : 'Auto-Send Reminders'}
        </button>
        
        <button 
          onClick={handleExportList}
          disabled={loading}
          className="
            w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
            font-medium bg-gray-100 dark:bg-gray-900 
            text-gray-900 dark:text-gray-100
            hover:bg-gray-200 dark:hover:bg-gray-800
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          Export Renewal List
        </button>
      </div>
    </div>
  )
}

export default MemberRenewalManagement
