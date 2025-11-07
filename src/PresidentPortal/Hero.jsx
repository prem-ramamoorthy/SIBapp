import { useState } from 'react'
import SIBbutton from './components/SIBbutton'
import CreateMeeting from './components/CreateMeeting'
import EventCard from './components/EventCard'


function Hero() {
  const [meetings, setMeetings] = useState([
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

          <div className="mb-8">
            {meetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {meetings.map(event => (
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

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          <CreateMeeting />
          {/* <SIBbutton 
            content="View Calendar" 
          /> */}
          <SIBbutton
            content="View All Meetings"
            variant="secondary"
          />
          <SIBbutton
            content="Send Meeting Reminder"
            variant="secondary"
          />
        </div>

      </div>
    </div>
  )
}

export default Hero
