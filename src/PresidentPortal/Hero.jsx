import { useState } from 'react';
import SIBbutton from './components/SIBbutton';
import CreateMeeting from './components/CreateMeeting';
import EventCard from './components/EventCard';
import { MeetingsModal } from './components/MeetingModal';
import useFetch from '../hooks/useFetch';

function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: meetings, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/meeting/getmeetings`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return (
    <div className="w-full">
      <div
        className="
          bg-white dark:bg-gray-800 
          rounded-2xl shadow-lg 
          border border-gray-200 dark:border-gray-700
          p-4 sm:p-6 lg:p-8
          transition-colors duration-300
        "
      >
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4 max-w-full break-words">
            Meeting Management
          </h1>

          <div className="mb-8">
            {loading && (
              <p className="text-center text-gray-600 dark:text-gray-400">Loading meetings...</p>
            )}
            {error && (
              <p className="text-center text-red-600 dark:text-red-400">
                Error loading meetings: {error.message || error.toString()}
              </p>
            )}
            {!loading && !error && meetings && meetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {meetings.slice(0,3).map((event, index) => (
                  <EventCard
                    id={event._id || ""}
                    title={event.title}
                    date={event.meeting_date}
                    time={event.meeting_time}
                    location={event.location}
                    status={event.meeting_status}
                    key={event._id || index}
                  />
                ))}
              </div>
            ) : (!loading && !error) && (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No meetings found</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
          <CreateMeeting />
          <SIBbutton
            content="View Meetings"
            variant="secondary"
            onClick={() => setIsOpen(true)}
          />
          <MeetingsModal
            meetings={meetings}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
          <SIBbutton
            content="Send Meeting Reminder"
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
