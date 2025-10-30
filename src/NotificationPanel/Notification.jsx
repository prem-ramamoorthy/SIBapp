import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Bell } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { NavLink } from "react-router-dom";

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

export default function Notification() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const detailRef = useRef(null);
  const [activeNotif, setActiveNotif] = useState(null);

  const {
    data: listData,
    loading: listLoading,
    error: listError,
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/notification/getallnotifications`,
    { method: "GET", credentials: "include" }
  );

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (Array.isArray(listData)) setNotifications(listData);
  }, [listData]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const toggle = () => setOpen((o) => !o);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (panelRef.current?.contains(e.target) || buttonRef.current?.contains(e.target)) return;
      close();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const focusable = panelRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = panelRef.current.querySelectorAll(
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
  }, [open, close]);

  const markAllRead = async () => {
    const prev = notifications;
    setNotifications((p) => p.map((n) => ({ ...n, read: true })));
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/notification/readallnotifications`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({}),
        }
      );
      if (!res.ok) throw new Error(`Error ${res.status}`);
      await res.json();
    } catch (e) {
      console.log(e)
      setNotifications(prev);
    }
  };

  const patchReadById = async (id) => {
    const datetime = new Date().toISOString().replace("Z", "+00:00");
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_SERVER}/notification/updatenotificationbyid/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true , readAt : datetime }),
        credentials: "include",
      }
    );
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
  };

  const openDetails = async (n) => {
    setActiveNotif(n);
    setDetailOpen(true);

    const prev = notifications;
    setNotifications((prevList) =>
      prevList.map((x) => (x._id === n._id ? { ...x, read: true } : x))
    );

    try {
      await patchReadById(n._id);
    } catch {
      setNotifications(prev);
    }
  };

  useEffect(() => {
    if (!detailOpen) return;

    const focusable = detailRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setDetailOpen(false);
        requestAnimationFrame(() => panelRef.current?.focus?.());
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
  }, [detailOpen]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="notification-panel"
        onClick={toggle}
        className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Bell className="text-gray-700 dark:text-gray-200" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-medium text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          id="notification-panel"
          role="dialog"
          aria-label="Notifications"
          aria-modal="true"
          className="absolute -right-[80px] z-50 mt-2 w-80 origin-top-right rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <h3 className="text-sm font-semibold text-black dark:text-gray-200">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              {listLoading && (
                <span className="text-xs text-gray-500 dark:text-gray-300">Loading…</span>
              )}
              {listError && (
                <span className="text-xs text-red-600">Error</span>
              )}
              <button
                onClick={markAllRead}
                className="rounded-md px-2 py-1 text-xs text-black dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-600/30 transition-colors disabled:opacity-50"
                disabled={listLoading || !!listError}
              >
                Mark all read
              </button>
              <button
                onClick={close}
                aria-label="Close notifications"
                className="rounded-md p-1 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
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
          </div>

          <ul className="max-h-80 overflow-y-auto">
            {listLoading && (
              <li className="px-4 py-6 text-sm text-gray-600 dark:text-gray-300">
                Loading notifications…
              </li>
            )}
            {listError && (
              <li className="px-4 py-6 text-sm text-red-600">
                Failed to load. Try again.
              </li>
            )}
            {!listLoading && !listError && notifications.length === 0 && (
              <li className="px-4 py-6 text-sm text-black dark:text-gray-200">
                No notifications
              </li>
            )}

            {!listLoading && !listError && notifications.map((n, idx) => (
              <li key={n._id}>
                <button
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${!n.read ? "bg-indigo-50/60 dark:bg-indigo-900/30" : "bg-white dark:bg-gray-800"
                    }`}
                  onClick={() => openDetails(n)}
                >
                  <span
                    className={`mt-1 h-2 w-2 flex-none rounded-full ${!n.read ? "bg-red-500" : "bg-gray-400 dark:bg-gray-500"
                      }`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-200">
                      {n.header}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-600 dark:text-gray-300">
                      {n.content}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-400">
                      {formatTime(n.createdAt)}
                    </p>
                  </div>
                </button>
                {idx < notifications.length - 1 && (
                  <div className="h-px bg-gray-200 dark:bg-gray-700" />
                )}
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
            <NavLink
              to='/allnotifications'
              className="w-full rounded-md px-3 py-2 text-sm text-amber-400 hover:bg-indigo-50 dark:hover:bg-indigo-600/30 transition-colors"
              onClick={() => {
                setOpen(false);
              }}
            >
              View all
            </NavLink>
          </div>
        </div>
      )}

      {detailOpen && activeNotif && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Notification details"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDetailOpen(false);
          }}
        >
          <div
            ref={detailRef}
            className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-4 shadow-lg outline-none"
          >
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
              <h4 className="text-sm font-semibold text-black dark:text-gray-200">
                {activeNotif.header}
              </h4>
              <button
                className="rounded-md p-1 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setDetailOpen(false)}
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
            <div className="mt-3 space-y-2">
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {activeNotif.content}
              </p>
              <p className="text-xs text-gray-400">{formatTime(activeNotif.createdAt)}</p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-md px-3 py-2 text-sm text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setDetailOpen(false)}
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
