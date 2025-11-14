import { ArrowRight, Edit, Loader2 } from "lucide-react";
import Events from "./Components/Events";
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { EventsModal } from "../PresidentPortal/components/EventModal";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-sm w-full p-8">
        <h2 className="text-xl font-bold mb-5 dark:text-white">Edit Coordinators</h2>
        <form onSubmit={e => {
          e.preventDefault();
          onSave(coords);
        }}>
          {coords.map((coord, idx) => (
            <div key={coord.role} className="mb-4 flex gap-2 items-center">
              <span className="block text-gray-700 dark:text-gray-200 min-w-[80px] capitalize">{coord.role}</span>
              <input
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-gray-50 dark:bg-gray-900 dark:text-white"
                value={coord.name}
                onChange={e => handleChange(idx, e.target.value)}
                required
                placeholder={`Name for ${coord.role}`}
                disabled={loading}
              />
            </div>
          ))}
          <div className="flex gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded font-semibold"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-amber-400 hover:bg-amber-500 py-2 px-4 rounded font-bold"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin inline-block" /> : "Save All"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function UpcomingEvents() {
  const [event, setEvent] = useState(null);
  const [canedit, setcanedit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getupcomingevents`,
    { method: "GET", credentials: "include" }
  );

  const { data: president } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/caneditevents`,
    { method: "GET", credentials: "include" }
  );

  const {
    data: events,
    loading: eventloading,
    error: eventerror,
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/event/getallevents`,
    { method: "GET", credentials: "include" }
  );

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

  useEffect(() => {
    if (!loading && !error && Array.isArray(data) && data.length > 0) setEvent(data[0]);
    else if (!loading && (!data || (Array.isArray(data) && data.length === 0))) setEvent(null);
  }, [data, loading, error]);

  const hasEvent = event && typeof event === "object" && Object.keys(event).length > 0;

  useEffect(() => {
    if (president && typeof president.hasaccess === "boolean") setcanedit(president.hasaccess);
  }, [president]);

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
      setCoordSuccess("Coordinators updated");
      setEditModalOpen(false);
      await loadCoordinators();
    } catch (err) {
      setCoordError(err.message);
    } finally {
      setEditSaving(false);
      setTimeout(() => setCoordSuccess(null), 1500);
    }
  };

  return (
    <div className="
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
    ">
      <div className="min-h-full w-full flex flex-row">
        <div className="w-1/2">
          <div className="flex max-h-[32px] items-center justify-between py-3 sm:px-6 sm:py-4 shrink-0 border-b border-gray-200 dark:border-gray-700 ">
            <p className="text-sm ml-4  text-nowrap sm:text-[16px] font-bold text-gray-900 dark:text-gray-100 ">
              Upcoming Event
            </p>
            {eventloading ? <Loader2 /> : eventerror ? <BiErrorCircle /> : events ? (
              <>
                <button
                  className="
                    flex items-center gap-2 p-2 rounded-md
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    transition-colors duration-200 mr-3
                  "
                  onClick={() => setIsModalOpen(true)}
                  aria-label="See all events"
                >
                  <ArrowRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                </button>
                <EventsModal
                  events={events}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </>
            ) : null}
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
          <div className="
            flex-1 flex-wrap w-full min-h-full
            text-gray-800 dark:text-gray-200
          ">
            {loading ? (
              <Loading />
            ) : hasEvent ? (
              <div className="w-full overflow-auto mt-3">
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
          <div className="flex min-w-full justify-between items-center">
            <h2 className="text nowrap text-md border-b-1 border-gray-200 dark:border-gray-700 font-bold m-1 text-gray-800 dark:text-white">
              Leadership Team
            </h2>
            {canedit && (
              <button className="dark:text-amber-300 text-sm m-2" onClick={handleEditClick}>
                <Edit size="20" />
              </button>
            )}
          </div>
          {coordLoading ? <Loader2 className="mx-2 my-3" /> : null}
          {coordError && <p className="text-xs text-red-600 px-2">{coordError}</p>}
          {coordSuccess && <p className="text-xs text-green-600 px-2">{coordSuccess}</p>}
          <div className="flex flex-col gap-1 text-[12px] text-nowrap text-black">
            {coordinators.map((coord, i) => (
              <div
                key={coord._id ?? i}
                className="rounded-lg px-2 flex flex-row-reverse justify-between text-gray-900 dark:text-gray-100 items-center"
              >
                <p className="font-semibold text-black dark:text-gray-100">{coord.name}</p>
                <p className="text-sm text-black dark:text-gray-300">{coord.role}</p>
              </div>
            ))}
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
