import { useEffect, useRef, useState, useCallback } from "react";
import { Bell } from "lucide-react";


export default function Notification() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);


  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Visitor", body: "New Member arrived to your company", time: "Just now", unread: true },
    { id: 2, title: "New TYFTB", body: "TYFTB sent to you by Member", time: "5m ago", unread: false },
    { id: 3, title: "New Meeting", body: "New Meeting has been scheduled by your chapter leader on 12/12/2025", time: "1h ago", unread: true },
  ]);


  const unreadCount = notifications.filter(n => n.unread).length;


  const toggle = () => setOpen(o => !o);


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


  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };


  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="notification-panel"
        onClick={toggle}
        className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 "
      >
        <Bell />


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
          className="absolute -right-[80px] z-50 mt-2 w-80 origin-top-right rounded-lg border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3  ">
            <h3 className="text-sm font-semibold text-black ">
              Notifications
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                className="rounded-md px-2 py-1 text-xs text-black hover:bg-indigo-50 "
              >
                Mark all read
              </button>
              <button
                onClick={close}
                aria-label="Close notifications"
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 focus:outline-none "
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
            {notifications.length === 0 && (
              <li className="px-4 py-6 text-sm text-black">
                No notifications
              </li>
            )}
            {notifications.map((n, idx) => (
              <li key={n.id}>
                <button
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-gray-50 ${n.unread ? "bg-indigo-50/60 " : ""
                    }`}
                  onClick={() =>
                    setNotifications(prev =>
                      prev.map(x => (x.id === n.id ? { ...x, unread: false } : x))
                    )
                  }
                >
                  <span
                    className={`mt-1 h-2 w-2 flex-none rounded-full ${n.unread ? "bg-red-500" : "bg-gray-300 "
                      }`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 ">
                      {n.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-gray-600 ">
                      {n.body}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400">{n.time}</p>
                  </div>
                </button>
                {idx < notifications.length - 1 && (
                  <div className="h-px bg-gray-200" />
                )}
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 px-4 py-2 ">
            <button
              className="w-full rounded-md px-3 py-2 text-sm text-amber-400 hover:bg-indigo-50 "
              onClick={() => {
                close();
              }}
            >
              View all
            </button>
          </div>
        </div>
      )}
    </div>
  );
}