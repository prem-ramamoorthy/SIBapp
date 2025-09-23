import { ArrowRight } from "lucide-react"
import Events from "./Components/Events"

function UpcomingEvents() {
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
        <button
          className="flex items-center gap-2 p-2 rounded-md"
          aria-label="See all events"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div
        className="
          flex-1 min-h-0
          overflow-auto
          max-w-full
        "
      >
        <div className="">
          <Events company="The Future of AI in Everyday Life" date="July 15, 2024" time="3:00 PM - 4:00 PM" vatNumber="FBIOPENUP" />
          <Events company="The Future of AI in Everyday Life" date="July 15, 2024" time="3:00 PM - 4:00 PM" vatNumber="FBIOPENUP" />
        </div>
      </div>
    </div>
  )
}

export default UpcomingEvents
