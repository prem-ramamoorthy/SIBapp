import { ArrowRight } from "lucide-react";
import Events from "./Components/Events";
import { NavLink } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";

const coordinators = [
  { name: "Alice Sharma", role: "Lead Coordinator" },
  { name: "Rahul Verma", role: "Co-Coordinator" },
  { name: "Priya Singh", role: "Support" },
  { name: "Karan Patel", role: "Volunteer" },
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
          <div className="flex items-center justify-between py-3 sm:px-6 sm:py-4 shrink-0 border-b border-gray-200 dark:border-gray-700 ">
            <h2 className="text-[16px] sm:text-xl font-bold text-gray-900 dark:text-gray-100 m-0">
              Upcoming Events
            </h2>
            <NavLink
              className="
            flex items-center gap-2 p-2 rounded-md
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors duration-200
          "
              aria-label="See all events"
              to={"/events"}
            >
              <ArrowRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            </NavLink>
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
                  company={event.companyName}
                  date={event.date}
                  time={event.time}
                  vatNumber={event.VATnumber}
                />
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 px-4 py-2">
                No Upcoming Events
              </p>
            )}
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-start px-2 bg-amber-50 border-l-1 border-amber-50 dark:bg-gray-900">
          <h2 className="text-lg border-b-1 font-bold m-1 text-gray-800 dark:text-yellow-200">
            Coordinators
          </h2>
          <div className="flex flex-col gap-1 text-sm">
            {coordinators.map(({ name, role }, i) => (
              <div
                key={i}
                className="rounded-lg px-2 flex flex-row-reverse justify-between dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow"
              >
                <p className="font-semibold text-gray-100">{name}</p>
                <p className="text-sm text-gray-300 dark:text-gray-400">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default UpcomingEvents;
