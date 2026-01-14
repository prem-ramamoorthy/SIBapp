import { ArrowRight, Edit, Loader2, Calendar } from "lucide-react";
import Events from "./Components/Events";
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";
import { useEffect, useState, useMemo } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { EventsModal } from "../PresidentPortal/components/EventModal";

// --- Coordinator Bulk Edit Modal (UI Remains the same) ---
function CoordinatorBulkEditModal({ open, onClose, onSave, initial, loading }) {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    setCoords([...(initial || [])]);
  }, [initial]);

  const handleChange = (index, value) => {
    setCoords(prev =>
      prev.map((c, i) => (i === index ? { ...c, name: value } : c))
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Edit Leadership Team</h2>
        </div>
        
        <form onSubmit={e => {
          e.preventDefault();
          onSave(coords);
        }} className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {coords.map((coord, idx) => (
            <div key={coord.role} className="group">
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                {coord.role}
              </label>
              <input
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all"
                value={coord.name}
                onChange={e => handleChange(idx, e.target.value)}
                required
                placeholder={`Name for ${coord.role}`}
                disabled={loading}
              />
            </div>
          ))}
          
          <div className="flex gap-3 pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white shadow-md shadow-amber-500/20 py-2 px-4 rounded-lg text-sm font-bold transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin inline-block w-4 h-4" /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Main Component ---
function UpcomingEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Upcoming Events
  const { data: eventsData, loading: eventsLoading, error: eventsError } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getupcomingevents`,
    { method: "GET", credentials: "include" }
  );

  // 2. Fetch Latest Meeting
  const { data: meetingData, loading: meetingLoading, error: meetingError } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/meeting/getlatestmeeting`,
    { method: "GET", credentials: "include" }
  );

  // 3. Fetch Permissions
  const { data: presidentData } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/caneditevents`,
    { method: "GET", credentials: "include" }
  );

  // 4. Fetch All Events for Modal
  const {
    data: allEvents,
    loading: allEventsLoading,
    error: allEventsError,
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/event/getallevents`,
    { method: "GET", credentials: "include" }
  );

  const currentEvent = useMemo(() => 
    (!eventsLoading && !eventsError && Array.isArray(eventsData) && eventsData.length > 0) 
      ? eventsData[0] 
      : null, 
  [eventsData, eventsLoading, eventsError]);

  const currentMeeting = useMemo(() => 
    (!meetingLoading && !meetingError && meetingData && !meetingData.message)
      ? meetingData
      : null, 
  [meetingData, meetingLoading, meetingError]);

  const canEdit = presidentData?.hasaccess === true;

  // Coordinator Management State
  const [coordinators, setCoordinators] = useState([]);
  const [coordLoading, setCoordLoading] = useState(false);
  const [coordError, setCoordError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [coordSuccess, setCoordSuccess] = useState(null);

  const loadCoordinators = async () => {
    setCoordLoading(true);
    setCoordError(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/admin/coordinator/getcoordinators`,
        { method: "GET", credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to load coordinators");
      const json = await res.json();
      setCoordinators(Array.isArray(json) ? json : []);
    } catch (err) {
      setCoordError(err.message);
    } finally {
      setCoordLoading(false);
    }
  };

  useEffect(() => { loadCoordinators(); }, []);

  const handleEditClick = () => setEditModalOpen(true);

  const handleSaveAll = async (edits) => {
    setEditSaving(true);
    setCoordError(null);
    setCoordSuccess(null);
    try {
      await Promise.all(
        edits.map((edit) =>
          fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/admin/coordinator/updatecoordinatorsbyrole`,
            {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: edit.name, role: edit.role }),
            }
          ).then((res) => {
            if (!res.ok) throw new Error(`Failed for ${edit.role}`);
            return res;
          })
        )
      );
      setCoordSuccess("Updated");
      setEditModalOpen(false);
      await loadCoordinators();
    } catch (err) {
      setCoordError(err.message);
    } finally {
      setEditSaving(false);
      setTimeout(() => setCoordSuccess(null), 2000);
    }
  };

  const hasEvent = !!currentEvent;
  const hasMeeting = !!currentMeeting;
  const mainLoading = eventsLoading || meetingLoading;
  const mainError = eventsError;

  return (
    <div className="
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      rounded-xl sm:rounded-2xl
      w-full h-fit
      flex flex-col
      shadow-md dark:shadow-gray-900/50
      border border-gray-100 dark:border-gray-800
      transition-colors duration-300
      overflow-hidden
    ">
      <div className="w-full flex flex-col lg:flex-row">
        
        {/* Left Side: Upcoming Events & Meetings */}
        <div className="w-full lg:w-2/3 flex flex-col border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800">
          
          {/* Header Section */}
          <div className="flex items-center justify-between py-3 px-4 sm:px-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">
                Upcoming Schedule
              </h3>
            </div>
            
            {allEventsLoading ? (
              <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
            ) : allEventsError ? (
              <BiErrorCircle className="text-red-500" />
            ) : allEvents ? (
              <>
                <button
                  className="
                    flex items-center gap-1.5 px-3 py-1 rounded-full
                    text-[11px] sm:text-xs font-semibold
                    text-amber-700 dark:text-amber-400
                    bg-amber-100/50 dark:bg-amber-900/20
                    hover:bg-amber-100 dark:hover:bg-amber-900/40
                    active:bg-amber-200 dark:active:bg-amber-900/60
                    transition-all duration-200
                  "
                  onClick={() => setIsModalOpen(true)}
                >
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
                <EventsModal
                  events={allEvents}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </>
            ) : null}
          </div>

          {mainError && (
            <div className="m-3 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <BiErrorCircle className="w-4 h-4" />
              <span>{typeof mainError === "string" ? mainError : "Unable to load schedule data."}</span>
            </div>
          )}

          <div className="flex-1 w-full p-4 bg-white dark:bg-gray-900">
            {mainLoading ? (
              <div className="h-24 flex items-center justify-center">
                 <Loading />
              </div>
            ) : (
              <>
                {!hasEvent && !hasMeeting && (
                   <div className="flex flex-col items-center justify-center text-center py-6 text-gray-400">
                      <Calendar className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-xs">No upcoming events or meetings.</p>
                   </div>
                )}

                {/* Grid Layout: Compact Side by Side */}
                <div className={`grid grid-cols-1 ${hasEvent && hasMeeting ? 'md:grid-cols-2' : 'grid-cols-1'} gap-3 sm:gap-4`}>
                  
                  {/* Event Card */}
                  {hasEvent && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-2 px-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          Event
                        </span>
                      </div>
                      <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-sm active:scale-[0.98] active:bg-gray-50 dark:active:bg-gray-800 transition-all duration-200 overflow-hidden relative cursor-pointer group">
                         <div className="p-0.5">
                          <Events
                            title={currentEvent.companyName}
                            date={currentEvent.date}
                            time={currentEvent.time}
                            vatNumber={currentEvent.VATnumber}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Meeting Card */}
                  {hasMeeting && (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-2 px-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                          Meeting
                        </span>
                      </div>
                      <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-sm active:scale-[0.98] active:bg-gray-50 dark:active:bg-gray-800 transition-all duration-200 overflow-hidden relative cursor-pointer group">
                        <div className="p-0.5">
                           <Events
                            title={currentMeeting.title}
                            date={currentMeeting.meeting_date}
                            time={currentMeeting.meeting_time}
                            vatNumber={currentMeeting.location} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Leadership Team */}
        <div className="w-full lg:w-1/3 flex flex-col bg-gray-50/50 dark:bg-gray-900/30">
          <div className="py-3 px-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-900 lg:bg-transparent">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>Leadership</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {coordinators.length}
              </span>
            </h2>
            {canEdit && (
              <button 
                onClick={handleEditClick}
                className="p-1 rounded text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 active:scale-90 transition-all"
                title="Edit Team"
              >
                <Edit size="14" />
              </button>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto max-h-[300px] lg:max-h-[350px] custom-scrollbar">
            {coordLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="animate-spin text-amber-500 w-5 h-5" />
              </div>
            ) : coordError ? (
              <p className="text-[10px] text-red-600 bg-red-50 p-2 rounded">{coordError}</p>
            ) : (
              <div className="flex flex-col gap-3">
                {coordSuccess && (
                  <div className="text-[10px] text-center text-green-700 bg-green-50 border border-green-100 p-1.5 rounded animate-fade-in">
                    {coordSuccess}
                  </div>
                )}
                
                {coordinators.map((coord, i) => (
                  <div
                    key={coord._id ?? i}
                    className="flex justify-between items-start group border-b border-gray-100 dark:border-gray-800/50 last:border-0 pb-2 last:pb-0"
                  >
                    <div className="flex flex-col">
                      <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {coord.role}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {coord.name}
                      </p>
                    </div>
                  </div>
                ))}
                
                {coordinators.length === 0 && (
                   <p className="text-xs text-gray-400 italic text-center py-2">No members found.</p>
                )}
              </div>
            )}
          </div>
          
          <CoordinatorBulkEditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSaveAll}
            initial={coordinators}
            loading={editSaving}
          />
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvents;