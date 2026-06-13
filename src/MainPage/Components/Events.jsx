import { CalendarDays, Clock, MapPin } from "lucide-react";

function Events({
  title = "The Future of AI in Everyday Life",
  date = "July 15, 2024",
  time = "3:00 PM - 4:00 PM",
  vatNumber = "" // Location/Details
}) {
  return (
    <div className="flex items-start gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl transition-all h-full">
      {/* Date Badge */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-100 dark:border-amber-800/50">
        <CalendarDays className="w-5 h-5 text-amber-500" />
      </div>
      
      {/* Event Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 mb-1" title={title}>
          {title}
        </h3>
        
        <div className="flex flex-col gap-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="truncate">{date} • {time}</span>
          </div>
          
          {vatNumber && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
              <span className="truncate" title={vatNumber}>{vatNumber}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
