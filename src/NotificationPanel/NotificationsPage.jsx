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

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="absolute w-full left-0 top-1">
        <Header />
        </div>
      <h1 className="text-2xl font-bold mb-6 mt-10 dark:text-amber-50">Notifications</h1>
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="w-full min-w-[400px] border-collapse">
            <thead>
              <tr className="bg-indigo-50 dark:bg-indigo-900/30">
                <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">New</th>
                <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Header</th>
                <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Content</th>
                <th className="text-left px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((n) => (
                <tr key={n._id} className={n.read ? "" : "bg-indigo-50 dark:bg-indigo-900/10"}>
                  <td className="px-3 py-2">
                    {!n.read && (
                      <span className="inline-block h-2 w-2 rounded-full bg-red-500" aria-label="Unread" />
                    )}
                  </td>
                  <td className="px-3 py-2 font-medium truncate max-w-[120px] text-gray-900 dark:text-gray-200">{n.header}</td>
                  <td className="px-3 py-2 truncate max-w-[220px] text-gray-700 dark:text-gray-400">{n.content}</td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 text-xs">{formatTime(n.createdAt)}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={() => {
                        setActiveNotif(n);
                        setShowDetail(true);
                      }}
                      className="rounded-md px-2 py-1 bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
