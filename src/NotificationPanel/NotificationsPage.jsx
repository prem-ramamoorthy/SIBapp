import { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../MainPage/Header";

function formatTime(iso) {
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return "Just now";
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day < 7) return `${day}d ago`;
    return d.toLocaleString();
  } catch {
    return "";
  }
}

export default function NotificationsPage() {
  const [showDetail, setShowDetail] = useState(false);
  const [activeNotif, setActiveNotif] = useState(null);
  const [isMarkingRead, setIsMarkingRead] = useState(false);
  const detailRef = useRef(null);

  const [url, setUrl] = useState(
    `${import.meta.env.VITE_BACKEND_SERVER}/notification/getallnotifications`
  );
  const { data, loading, error } = useFetch(url, { method: "GET", credentials: "include" });

  useEffect(() => {
    if (showDetail) {
      const focusable = detailRef.current?.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
      const onKeyDown = (e) => {
        if (e.key === "Escape") {
          e.stopPropagation();
          setShowDetail(false);
        }
        if (e.key === "Tab" && detailRef.current) {
          const nodes = detailRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const focusables = Array.from(nodes);
          const first = focusables[0];
          const last = focusables[focusables.length - 1];
          if (!first || !last) return;

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }
  }, [showDetail]);

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingRead(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/notification/readallnotifications`, {
        method: "PATCH",
        credentials: "include"
      });
      if (res.ok) {
        // Force refetch to get updated read states
        setUrl(url.split('?')[0] + '?t=' + Date.now());
      }
    } catch (err) {
      console.error("Failed to mark notifications as read:", err);
    } finally {
      setIsMarkingRead(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="absolute w-full left-0 top-1">
        <Header />
        </div>
      <div className="flex items-center justify-between mb-6 mt-10">
        <h1 className="text-2xl font-bold dark:text-amber-50">Notifications</h1>
        {Array.isArray(data) && data.some(n => !n.read) && (
          <button
            onClick={handleMarkAllAsRead}
            disabled={isMarkingRead}
            className="rounded-md px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-200 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isMarkingRead ? "Marking..." : "Mark all as read"}
          </button>
        )}
      </div>
      {loading && (
        <div className="text-gray-500 dark:text-gray-400 py-8 text-center">Loading notifications…</div>
      )}
      {error && (
        <div className="py-8 text-center">
          <div className="text-red-600 mb-2">Failed to load: {error}</div>
          <button
            className="rounded-md px-4 py-2 bg-amber-400 text-black hover:bg-amber-500"
            onClick={() => setUrl(url)}
          >
            Retry
          </button>
        </div>
      )}
      {!loading && !error && Array.isArray(data) && data.length === 0 && (
        <div className="text-black dark:text-gray-200 py-8 text-center">No notifications.</div>
      )}
      {!loading && !error && Array.isArray(data) && data.length > 0 && (
        <div className="space-y-3">
          {data.map((n) => (
            <div
              key={n._id}
              onClick={() => {
                setActiveNotif(n);
                setShowDetail(true);
              }}
              className={`flex items-start gap-4 p-4 rounded-xl shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                n.read 
                  ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-80" 
                  : "bg-indigo-50/50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800"
              }`}
            >
              {/* Unread indicator */}
              <div className="flex-shrink-0 pt-1.5">
                {!n.read ? (
                  <span className="block h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" aria-label="Unread" />
                ) : (
                  <span className="block h-3 w-3 rounded-full bg-transparent" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className={`text-base font-semibold truncate ${n.read ? "text-gray-700 dark:text-gray-300" : "text-gray-900 dark:text-gray-100"}`}>
                    {n.header}
                  </h3>
                  <span className="text-xs whitespace-nowrap text-gray-500 dark:text-gray-400 font-medium">
                    {formatTime(n.createdAt)}
                  </span>
                </div>
                <p className={`text-sm line-clamp-2 ${n.read ? "text-gray-500 dark:text-gray-400" : "text-gray-700 dark:text-gray-300"}`}>
                  {n.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {showDetail && activeNotif && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Notification details"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowDetail(false);
          }}
        >
          <div
            ref={detailRef}
            className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg outline-none"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-2">
              <h4 className="text-lg font-semibold text-black dark:text-gray-200">
                {activeNotif.header}
              </h4>
              <button
                className="rounded-md p-1 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowDetail(false)}
                aria-label="Close details"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l4.95 4.95-1.414 1.414L10 11.414l-4.95 4.95-1.414-1.414L8.586 10l-4.95-4.95L5.05 3.636 10 8.586z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="text-gray-800 dark:text-gray-200">
                <span className="font-semibold">Message:</span>
                <div className="mt-1 whitespace-pre-wrap">{activeNotif.content}</div>
              </div>
              <div className="text-gray-400 text-xs">
                <div>
                  <span className="font-semibold">Created:</span> {formatTime(activeNotif.createdAt)}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {activeNotif.read ? 'Read' : 'Unread'}
                </div>
                {activeNotif.sender && (
                  <div>
                    <span className="font-semibold">Sender:</span> {activeNotif.sender}
                  </div>
                )}
                {activeNotif.receiver && (
                  <div>
                    <span className="font-semibold">Receiver:</span> {activeNotif.receiver}
                  </div>
                )}
                {activeNotif.readAt && (
                  <div>
                    <span className="font-semibold">Read At:</span> {formatTime(activeNotif.readAt)}
                  </div>
                )}
                <div>
                  <span className="font-semibold">Notification ID:</span> {activeNotif._id}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                className="rounded-md px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowDetail(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
