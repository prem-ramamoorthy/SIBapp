import React, { useState, useEffect } from 'react'
import EventCard from './components/EventCard'
import SIBbutton from './components/SIBbutton'
import CreateEvent from './components/CreateEvent'
import { EventsModal } from './components/EventModal'

function EventManagement({ refreshTrigger }) {

  const sampleEvents = [
    {
      title: "Annual Tech Conference 2025",
      organizerCompany: "Tech Summit Inc.",
      description: "Join industry leaders for discussions on emerging technologies, AI trends, and digital transformation strategies.",
      date: "2025-11-20",
      time: "09:00",
      duration: "2 days",
      eventType: "Conference",
      location: "Convention Center, New York"
    },
    {
      title: "React Advanced Patterns Workshop",
      organizerCompany: "Dev Academy",
      description: "Learn advanced React patterns including hooks, context, and performance optimization techniques.",
      date: "2025-11-25",
      time: "10:00",
      duration: "4 hours",
      eventType: "Workshop",
      location: "Online - Zoom"
    },
    {
      title: "Web Development Seminar",
      organizerCompany: "Code Masters",
      description: "Comprehensive seminar covering latest web development practices and tools for 2025.",
      date: "2025-11-18",
      time: "14:00",
      duration: "3 hours",
      eventType: "Seminar",
      location: "Tech Hub, Bangalore"
    }
  ];

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Summer Gathering',
      date: '15 Nov 2025',
      time: '6:00 PM',
      status: "upcoming"
    },
    {
      id: 2,
      title: 'Annual Conference',
      date: '20 Nov 2025',
      time: '10:00 AM',
      status: "completed"
    }
  ])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Refresh events when triggered
    console.log('Events refreshed')
  }, [refreshTrigger])

  return (
    <div className="w-full">
      <div className="
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-lg 
        border border-gray-200 dark:border-gray-700
        p-4 sm:p-6 lg:p-8
        transition-colors duration-300
      ">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6">
          Event Management
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="mb-8">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {events.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  status={event.status}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">No events found</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <CreateEvent />
          <SIBbutton
            content="View All Events"
            onClick={() => setIsModalOpen(true)}
            variant="secondary"
          />
          <EventsModal
            events={sampleEvents}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          <SIBbutton
            content="Send Event Reminder"
            variant="secondary"
          />
        </div>

        {loading && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-200">Creating event...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventManagement
