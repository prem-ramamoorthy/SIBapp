import React, { useState, useEffect } from 'react'
import SIBbutton from './components/SIBbutton'

function Hero({ onRefresh }) {
  const [meetingData, setMeetingData] = useState({
    nextMeeting: '5 Nov 2025, 7:00 PM',
    lastMeeting: '5 Nov 2025, 7:00 PM',
    attendance: { present: 155, total: 168 }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const attendancePercentage = Math.round(
    (meetingData.attendance.present / meetingData.attendance.total) * 100
  )

  const handleCreateMeeting = async () => {
    setLoading(true)
    try {
      // API call placeholder
      console.log('Creating new meeting...')
      onRefresh?.()
    } catch (err) {
      setError('Failed to create meeting')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-lg 
        border border-gray-200 dark:border-gray-700
        p-4 sm:p-6 lg:p-8
        transition-colors duration-300
      ">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">
            Meeting Management
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Next Meeting
              </p>
              <p className="text-base sm:text-lg font-normal text-gray-900 dark:text-gray-50">
                {meetingData.nextMeeting}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Last Meeting
              </p>
              <p className="text-base sm:text-lg font-normal text-gray-900 dark:text-gray-50">
                {meetingData.lastMeeting}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Attendance Rate
              </p>
              <p className="text-base sm:text-lg font-normal text-green-600 dark:text-green-400">
                {attendancePercentage}% ({meetingData.attendance.present} / {meetingData.attendance.total})
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <SIBbutton 
            content="Create New Meeting" 
            onClick={handleCreateMeeting}
            disabled={loading}
          />
          <SIBbutton 
            content="View Calendar" 
          />
          <SIBbutton 
            content="Edit Meeting" 
            variant="secondary"
          />
          <SIBbutton 
            content="Send Reminder" 
            variant="secondary"
          />
        </div>

        {loading && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-200">Creating meeting...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero
