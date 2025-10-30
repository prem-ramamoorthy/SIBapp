import { LogOut, User, Settings, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SidebarList from './SidebarList';

export default function HeaderAvatar({
  items = [
    { name: "Dashboard", icon: "House", path: "/dashboard", onclick },
    { name: "My Activity", icon: "TrendingUp", path: "/myactivity", onclick },
    { name: "Members Directory", icon: "users", path: "/members", onclick },
    { name: "Meetings", icon: "calendar", path: "/meetings", onclick },
    { name: "Chapter Info", icon: "building2", path: "/mychapter", onclick },
    { name: "Referral Slips", icon: "fileText", path: "/slips", onclick },
    { name: "Notifications", icon: "messageSquareDot", path: "/allnotifications", onclick },
    { name: "Analytics", icon: "chartLine", path: "/analytics", onclick },
    { name: "Visitors", icon: "userPlus", path: "/visitors", onclick },
    { name: "Substitutes", icon: "clock4", path: "/subtitutes", onclick }
  ]
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) setOpen(false);
    }
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const SidebarElements = items.map((element, index) => (
    <SidebarList
      onclick={element.onclick}
      name={element.name}
      icon={element.icon}
      path={element.path}
      key={index}
    />
  ));

  return (
    <div className="relative cursor-pointer z-10">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Menu className="text-gray-700 dark:text-gray-200" />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          tabIndex={-1}
          className="
            absolute left-0 mt-2 w-56
            rounded-lg border border-neutral-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            shadow-2xl
            overflow-hidden max-h-[70vh] overflow-y-auto
            transition-colors duration-300
          "
        >
          <ul className="py-1 m-2">
            {SidebarElements}
          </ul>
        </div>
      )}
    </div>
  );
}
