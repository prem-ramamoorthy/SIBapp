import React, { useState } from 'react'
import EventCard from './components/EventCard'
import SIBbutton from './components/SIBbutton'
import CreateEvent from './components/CreateEvent'
import { EventsModal } from './components/EventModal'
import useFetch from '../hooks/useFetch'

function EventManagement() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/event/getallevents`,
    {
      method: "GET",
      credentials: "include",
    }
  );

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
          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.slice(0, 3).map((event, index) => (
                <EventCard
                  title={event.event_title}
                  date={event.event_date}
                  time={event.event_time}
                  location={event.location}
                  id={event._id}
                  status={event.event_status}
                  key={event._id || index}
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
            events={data}
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
