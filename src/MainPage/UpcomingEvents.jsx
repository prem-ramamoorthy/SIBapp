import { ArrowRight, Loader2 } from "lucide-react";
import Events from "./Components/Events";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { EventsModal } from "../PresidentPortal/components/EventModal";

const coordinators = [
  { name: "Yogibalu", role: "President" },
  { name: "Kumaresavel", role: "VP " },
  { name: "Siva Chalapathy", role: "Secretary" },
  { name: "K.Devi", role: "Treasurer" },
];

function UpcomingEvents() {
  const [event, setEvent] = useState(null);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getupcomingevents`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: events, loading: eventloading, error: eventerror } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/event/getallevents`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  useEffect(() => {
    if (!loading && !error && Array.isArray(data) && data.length > 0) {
      setEvent(data[0]);
    } else if (!loading && (!data || (Array.isArray(data) && data.length === 0))) {
      setEvent(null);
    }
  }, [data, loading, error]);

  const hasEvent =
    event &&
    typeof event === "object" &&
    Object.keys(event).length > 0;

  return (
    <div
      className="
        div5 
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:7/1/10/2]
        sm:[grid-area:3/4/5/5]
        md:[grid-area:3/5/5/7]
        lg:[grid-area:3/6/5/9]
        xl:[grid-area:3/7/5/11]
        max-w-full
        min-h-0
        overflow-hidden
        flex flex-col
        shadow-md dark:shadow-gray-800/50
        transition-colors duration-300
      "
    >
      <div className="min-h-full w-full flex flex-row">
        <div className="w-1/2">
          <div className="flex max-h-[32px] items-center justify-between py-3 sm:px-6 sm:py-4 shrink-0 border-b border-gray-200 dark:border-gray-700 ">
            <h2 className="text-[16px] ml-4  text-nowrap sm:text-xl font-bold text-gray-900 dark:text-gray-100 ">
              Upcoming Event
            </h2>
            {eventloading ? <Loader2 /> : eventerror ? <BiErrorCircle /> : events ? (
              <>
                <button
                  className="
            flex items-center gap-2 p-2 rounded-md
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors duration-200 mr-3
          " onClick={() => setIsModalOpen(true)}
                  aria-label="See all events"
                >
                  <ArrowRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </button>
                <EventsModal
                  events={events}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </>) : null}
          </div>

          {error && (
            <p
              className="
            mb-4 rounded-md border px-3 py-2 text-sm
            bg-red-50 dark:bg-red-900/30
            text-red-700 dark:text-red-300
            border-red-200 dark:border-red-700
            transition-colors duration-300
          "
            >
              Error: {typeof error === "string" ? error : "Failed to load events."}
            </p>
          )}
          <div
            className="
          flex-1 flex-wrap w-full min-h-full
          text-gray-800 dark:text-gray-200
        "
          >
            {loading ? (
              <Loading />
            ) : hasEvent ? (
              <div className="w-full overflow-auto">
                <Events
                  title={event.companyName}
                  date={event.date}
                  time={event.time}
                  vatNumber={event.VATnumber}
                />
              </div>
            ) : (
              <p className="text-gray-500 text-nowrap dark:text-gray-400 px-4 py-2">
                No Upcoming Events
              </p>
            )}
          </div>
        </div>
        <div className="w-full min-w-[180px] flex flex-col justify-start px-2 text-black border-l-1 border-amber-50 dark:bg-gray-900">
          <h2 className="text-md border-b-1 border-gray-200 dark:border-gray-700  font-bold m-1 text-gray-800 dark:text-white">
            Coordinators
          </h2>
          <div className="flex flex-col gap-1 text-[12px] text-nowrap text-black">
            {coordinators.map(({ name, role }, i) => (
              <div
                key={i}
                className="rounded-lg px-2 my-1 flex flex-row-reverse justify-between text-gray-900 dark:text-gray-100 "
              >
                <p className="font-semibold text-black dark:text-gray-100">{name}</p>
                <p className="text-sm text-black dark:text-gray-300">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default UpcomingEvents;
