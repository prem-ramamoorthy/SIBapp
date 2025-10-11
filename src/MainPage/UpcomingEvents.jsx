import { ArrowRight } from "lucide-react"
import Events from "./Components/Events"
import { NavLink } from "react-router-dom"
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";

function UpcomingEvents() {

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getupcomingevents`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return (
    <div
      className="
        div5 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:7/1/10/2]
        sm:[grid-area:3/4/5/5]
        md:[grid-area:3/5/5/7]
        lg:[grid-area:3/6/5/9]
        xl:[grid-area:3/7/5/11]
        max-w-full
        min-h-0
        overflow-hidden
        flex flex-col
      "
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 shrink-0">
        <h2 className="text-[16px] sm:text-xl font-bold m-0">Upcoming Events</h2>
        <NavLink
          className="flex items-center gap-2 p-2 rounded-md"
          aria-label="See all events"
          to={"/events"}
        >
          <ArrowRight className="h-4 w-4" />
        </NavLink>
      </div>
      {error && (
        <p className="mb-4 rounded-md border px-3 py-2 text-sm bg-red-50 text-red-700 border-red-200">
          Error: {error}
        </p>
      )}
      <div
        className="
          flex-1 min-h-0
          overflow-auto
          max-w-full
        "
      >
        {loading ? (<Loading />) : data ? (<>
          <div className="h-3/4 w-full overflow-auto px-2">
            {
              data.map((event , index) => {
                return <Events company={event.companyName} date={event.date} time={event.time} vatNumber={event.VATnumber} key={index}/>
              })
            }
          </div>
        </>) : (<p className="text-gray-500">No Upcoming Events</p>)}
      </div>
    </div>
  )
}

export default UpcomingEvents
